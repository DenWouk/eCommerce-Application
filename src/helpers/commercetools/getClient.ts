import {
  AuthMiddlewareOptions,
  ClientBuilder,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow,
  createAuthWithExistingToken,
  createHttpClient,
  HttpMiddlewareOptions,
  Middleware,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import getConfig from 'next/config';
import tokenCache from '@/src/helpers/commercetools/tokenCache';

const {
  ROOT_AUTH = '',
  ROOT_API = '',
  PROJECT_KEY = '',
} = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

function getHTTPMiddlewareOptions(host: string): HttpMiddlewareOptions {
  return {
    host,
    fetch,
  };
}

function getAuthOptions(options: {
  scopes: string[];
  hostAuth?: string;
  clientId: string;
  clientSecret: string;
  projectKey?: string;
}): AuthMiddlewareOptions;
function getAuthOptions(
  options: {
    scopes: string[];
    hostAuth?: string;
    clientId: string;
    clientSecret: string;
    projectKey?: string;
  },
  user: UserAuthOptions
): PasswordAuthMiddlewareOptions;
function getAuthOptions(
  options: {
    scopes: string[];
    hostAuth?: string;
    clientId: string;
    clientSecret: string;
    projectKey?: string;
  },
  user?: UserAuthOptions
): AuthMiddlewareOptions | PasswordAuthMiddlewareOptions {
  const {
    hostAuth = ROOT_AUTH,
    projectKey = PROJECT_KEY,
    clientId,
    clientSecret,
    scopes,
  } = options;
  const defCredentials = { clientId, clientSecret };
  const credentials = user ? { ...defCredentials, user } : defCredentials;
  return {
    host: hostAuth,
    projectKey,
    credentials,
    scopes,
    fetch,
    tokenCache,
  };
}

function getClient(
  options: {
    scopes: string[];
    hostApi?: string;
    hostAuth?: string;
    clientId: string;
    clientSecret: string;
    projectKey?: string;
  },
  userOrToken?: UserAuthOptions | string
) {
  let middlewareOptions: AuthMiddlewareOptions | PasswordAuthMiddlewareOptions | undefined;
  let flowMiddleware: Middleware | undefined;
  if (!userOrToken) {
    middlewareOptions = getAuthOptions(options);
    flowMiddleware = createAuthForClientCredentialsFlow(middlewareOptions);
  } else if (typeof userOrToken === 'string') {
    flowMiddleware = createAuthWithExistingToken(`Bearer ${userOrToken}`);
  } else {
    middlewareOptions = getAuthOptions(options, userOrToken);
    flowMiddleware = createAuthForPasswordFlow(<PasswordAuthMiddlewareOptions>middlewareOptions);
  }

  return (
    new ClientBuilder()
      .withMiddleware(flowMiddleware)
      // .withLoggerMiddleware()
      .withMiddleware(createHttpClient(getHTTPMiddlewareOptions(options.hostApi || ROOT_API)))
      .build()
  );
}

export default getClient;
