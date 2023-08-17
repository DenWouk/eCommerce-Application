import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const tokenStore: TokenStore = { token: '', expirationTime: 0 };

const tokenCache: TokenCache & { clear: () => void } = {
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

export default tokenCache;
