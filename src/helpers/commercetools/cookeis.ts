import TOKEN_KEY from '@/src/constats';

type TokenData = {
  token: string;
  expirationTime: number;
};

export default function createValueCookieToken({ token, expirationTime }: TokenData) {
  return `${TOKEN_KEY}=${token}; Expires=${new Date(
    expirationTime
  ).toUTCString()}; SameSite=Strict; Path=/; HttpOnly;`;
}
