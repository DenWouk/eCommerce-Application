import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CustomerSignInResult, ClientResponse, Cart } from '@commercetools/platform-sdk';
import { AuthOptions } from 'next-auth/core/types';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import tokenCache from '@/src/helpers/commercetools/tokenCache';
import NamesClients from '@/src/helpers/commercetools/consts';
import BuilderApiRoot from '@/src/helpers/commercetools/builderApiRoot';

const apiRoot = new BuilderApiRoot(new ClientBuilder());

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: NamesClients.UNKNOWN,
      name: NamesClients.UNKNOWN,
      credentials: {},
      async authorize() {
        tokenCache.clear();
        try {
          await apiRoot
            .getApiRootForUnknown()
            .categories()
            .get({ queryArgs: { limit: 1 } })
            .execute();
        } catch {
          throw new Error('Oops, something went wrong, try again later');
        }
        return { id: '', token: tokenCache.get(), type: NamesClients.UNKNOWN };
      },
    }),
    CredentialsProvider({
      id: NamesClients.ANONYMOUS,
      name: NamesClients.ANONYMOUS,
      credentials: {},
      async authorize() {
        tokenCache.clear();
        let newCart: ClientResponse<Cart> | undefined;
        try {
          newCart = await apiRoot
            .getApiRootForAnonymous()
            .me()
            .carts()
            .post({ body: { currency: 'USD' } })
            .execute();
        } catch {
          throw new Error('Oops, something went wrong, try again later');
        }
        const { id } = newCart.body;
        return { id, token: tokenCache.get(), type: NamesClients.ANONYMOUS };
      },
    }),
    CredentialsProvider({
      id: NamesClients.PASSWORD,
      name: NamesClients.PASSWORD,
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Username and password were not provided');
        }
        tokenCache.clear();
        let customer: ClientResponse<CustomerSignInResult> | undefined;
        try {
          customer = await apiRoot
            .getApiRootForUser(credentials)
            .me()
            .login()
            .post({
              body: {
                email: credentials.username,
                password: credentials.password,
              },
            })
            .execute();
        } catch (e: any) {
          const code = e?.body?.errors?.[0]?.code;
          if (code === 'invalid_customer_account_credentials') {
            throw new Error(e.message);
          } else {
            throw new Error('Oops, something went wrong, try again later');
          }
        }

        const { id, firstName, email } = customer.body.customer;
        return {
          id,
          name: firstName,
          email,
          token: tokenCache.get(),
          type: NamesClients.PASSWORD,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { token: tokenStore, id, type } = user;
        return { ...token, id, type, token: tokenStore };
      }
      return token;
    },

    async session({ session, token }) {
      const { id, type } = token;
      return { ...session, type, id };
    },
  },
  theme: {
    colorScheme: 'light',
  },
};
export default NextAuth(authOptions);
