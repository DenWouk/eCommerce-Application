/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { DefaultJWT } from 'next-auth/src/jwt/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import NamesClients from '@/src/helpers/commercetools/consts';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'];
    id: string;
    type: NamesClients;
    error?: string;
  }

  interface User extends DefaultUser {
    type: NamesClients;
    token: TokenStore;
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    id: string;
    type: NamesClients;
    token: TokenStore;
    error?: string;
  }
}
