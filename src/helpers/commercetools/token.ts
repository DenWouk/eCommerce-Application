import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import getConfig from 'next/config';
import { JWT } from 'next-auth/jwt';
import { FetchedToken } from '@/src/types/commercetools';

const {
  ROOT_AUTH,
  CLIENT_ID = '',
  CLIENT_SECRET = '',
} = getConfig().serverRuntimeConfig as Record<string, string | undefined>;

const tokenStore: TokenStore = { token: '', expirationTime: 0 };

export const tokenCache: TokenCache & { clear: () => void } = {
  get() {
    return tokenStore;
  },
  set(value) {
    tokenStore.token = value.token;
    tokenStore.refreshToken = value.refreshToken;
    tokenStore.expirationTime = value.expirationTime;
  },

  clear() {
    tokenStore.token = '';
    tokenStore.expirationTime = 0;
    tokenStore.refreshToken = '';
  },
};

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  const { refreshToken } = token.token;

  if (!refreshToken) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }

  const url = `${ROOT_AUTH}/oauth/token`;
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const refreshedTokens = (await response.json()) as Omit<FetchedToken, 'refresh_token'>;

    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw refreshedTokens;
    }

    const { access_token: at, expires_in: eI } = refreshedTokens;

    return {
      ...token,
      token: {
        token: at,
        expirationTime: Date.now() + eI * 1000,
        refreshToken: token.token.refreshToken,
      },
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
