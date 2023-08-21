import { TOKEN_KYE } from '@/src/constats';

type TokenData = {
  token: string;
  expirationTime: number;
};

export default function createValueCookieToken({ token, expirationTime }: TokenData) {
  return `${TOKEN_KYE}=${token}; Expires=${new Date(
    expirationTime
  ).toUTCString()}; SameSite=Strict; Path=/; HttpOnly;`;
}
