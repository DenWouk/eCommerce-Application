import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/src/jwt/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import NamesClients from '@/src/helpers/commercetools/consts';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'];
    id: string;
    type: NamesClients;
  }

  interface User extends DefaultUser {
    type: NamesClients;
    token: TokenStore;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    id: string;
    type: NamesClients;
    token: TokenStore;
  }
}
