import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const tokenStorage: { clientId?: TokenStore; default: TokenStore } = {
  default: { token: '', expirationTime: 0 },
};

const tokenCache: TokenCache = {
  get: (tokenCacheOptions?): TokenStore => {
    const clientId = tokenCacheOptions?.clientId;
    if (clientId) {
      const tokenStore = tokenStorage[clientId as keyof typeof tokenStorage];
      return tokenStore || tokenStorage.default;
    }
    return tokenStorage.default;
  },
  set: (cache, tokenCacheOptions?) => {
    const clientId = tokenCacheOptions?.clientId;
    if (clientId) {
      tokenStorage[clientId as keyof typeof tokenStorage] = cache;
    } else {
      tokenStorage.default = cache;
    }
  },
};

export default tokenCache;
