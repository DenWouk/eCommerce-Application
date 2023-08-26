import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ClientResponse, Cart, Customer } from '@commercetools/platform-sdk';
import { AuthOptions } from 'next-auth/core/types';
import { getToken, GetTokenParams } from 'next-auth/jwt';
import { getCookieParser } from 'next/dist/server/api-utils';
import tokenCache from '@/src/helpers/commercetools/tokenCache';
import NamesClients from '@/src/helpers/commercetools/consts';
import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';

const builder = builderApiRoot;

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: NamesClients.UNKNOWN,
      name: NamesClients.UNKNOWN,
      credentials: {},
      async authorize() {
        tokenCache.clear();
        try {
          await builder
            .createForUnknown()
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
          newCart = await builder
            .createForAnonymous()
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
      async authorize(credentials, req) {
        tokenCache.clear();
        const cookies = req?.headers && getCookieParser(req.headers)();
        let typeBuilder: keyof Pick<TypeBuilderApiRoot, 'createForUser' | 'createForAnonymous'> =
          'createForUser';
        let isAnonymousSession: boolean = false;
        if (cookies) {
          const jwt = await getToken({ req: { cookies, headers: req.headers } } as GetTokenParams);
          const { token, type } = jwt || {};
          isAnonymousSession = type === NamesClients.ANONYMOUS && !!token;
          if (isAnonymousSession) {
            typeBuilder = 'createForAnonymous' as const;
          }
        }
        if (!credentials) {
          throw new Error('Username and password were not provided');
        }

        const client = builder[typeBuilder](credentials);
        let customer: Customer | undefined;
        try {
          customer = (
            await client
              .me()
              .login()
              .post({
                body: {
                  email: credentials.username,
                  password: credentials.password,
                },
              })
              .execute()
          ).body.customer;
          tokenCache.clear();

          if (isAnonymousSession) {
            customer = (await builder.createForUser(credentials).me().get().execute()).body;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          const code = e?.body?.errors?.[0]?.code;
          if (code === 'invalid_customer_account_credentials') {
            throw new Error(e.message);
          } else {
            throw new Error('Oops, something went wrong, try again later');
          }
        }
        const token = tokenCache.get();
        tokenCache.clear();

        const { id, firstName, email } = customer;
        return {
          id,
          name: firstName,
          email,
          token,
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
