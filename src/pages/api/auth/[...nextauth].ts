import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ClientResponse, Cart, Customer } from '@commercetools/platform-sdk';
import { AuthOptions } from 'next-auth/core/types';
import { getToken, GetTokenParams } from 'next-auth/jwt';
import { getCookieParser } from 'next/dist/server/api-utils';
import NamesClients from '@/src/helpers/commercetools/consts';
import builderApiRoot from '@/src/helpers/commercetools/builderApiRoot';
import { refreshAccessToken, tokenCache } from '@/src/helpers/commercetools/token';

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
        const cookies = req?.headers && getCookieParser(req.headers)();
        let isAnonymousSession: boolean = false;
        if (cookies) {
          const jwt = await getToken({ req: { cookies, headers: req.headers } } as GetTokenParams);
          const { token, type } = jwt || {};
          isAnonymousSession = type === NamesClients.ANONYMOUS && !!token;
        }
        if (!credentials) {
          throw new Error('Username and password were not provided');
        }

        let customer: Customer | undefined;
        try {
          if (isAnonymousSession) {
            tokenCache.clear();
            customer = (
              await builder
                .createForAnonymous()
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
          }
          tokenCache.clear();
          customer = (await builder.createForUser(credentials).me().get().execute()).body;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          const code = e?.body?.errors?.[0]?.code;
          if (code === 'invalid_customer_account_credentials' || code === 'InvalidCredentials') {
            throw new Error(e.message);
          } else {
            throw new Error('Oops, something went wrong, try again later');
          }
        }
        const token = tokenCache.get();

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
    async jwt({ token, user, trigger, session }) {
      const copyToken = { ...token };
      if (user) {
        const { token: tokenStore, id, type } = user;
        return { ...copyToken, id, type, token: tokenStore };
      }

      if (trigger === 'update') {
        copyToken.name = session.name;
      }

      if (Date.now() < copyToken.token.expirationTime) {
        return copyToken;
      }

      return refreshAccessToken(copyToken);
    },

    async session({ session, token }) {
      const { id, type, name } = token;
      return { ...session, type, id, user: { ...session.user, name } };
    },
  },
  session: {
    maxAge: 180 * 24 * 60 * 60,
  },
  theme: {
    colorScheme: 'light',
  },
};
export default NextAuth(authOptions);
