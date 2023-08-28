import {
  AuthMiddlewareOptions,
  ClientBuilder,
  createAuthForAnonymousSessionFlow,
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
import { tokenCache } from '@/src/helpers/commercetools/token';
import NamesClients from '@/src/helpers/commercetools/consts';

const {
  ROOT_AUTH = '',
  ROOT_API = '',
  PROJECT_KEY = '',
} = getConfig().serverRuntimeConfig as Record<string, string | undefined>;

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

type UnknownTypeClient = {
  type: NamesClients.UNKNOWN;
};

type AnonymousTypeClient = {
  type: NamesClients.ANONYMOUS;
};

type PasswordTypeClient = {
  type: NamesClients.PASSWORD;
  value: UserAuthOptions;
};

type WithExistingTokenTypeClient = {
  type: NamesClients.EXISTING;
  value: string;
};

type TypeClient =
  | UnknownTypeClient
  | AnonymousTypeClient
  | PasswordTypeClient
  | WithExistingTokenTypeClient;

function getClient(
  options: {
    scopes: string[];
    hostApi?: string;
    hostAuth?: string;
    clientId: string;
    clientSecret: string;
    projectKey?: string;
  },
  typeClient: TypeClient = { type: NamesClients.UNKNOWN }
) {
  let middlewareOptions: AuthMiddlewareOptions | PasswordAuthMiddlewareOptions | undefined;
  let flowMiddleware: Middleware | undefined;
  const { type } = typeClient;

  switch (type) {
    case NamesClients.ANONYMOUS:
      middlewareOptions = getAuthOptions(options);
      flowMiddleware = createAuthForAnonymousSessionFlow(middlewareOptions);
      break;
    case NamesClients.PASSWORD:
      middlewareOptions = getAuthOptions(options, typeClient.value);
      flowMiddleware = createAuthForPasswordFlow(<PasswordAuthMiddlewareOptions>middlewareOptions);
      break;
    case NamesClients.EXISTING:
      flowMiddleware = createAuthWithExistingToken(`Bearer ${typeClient.value}`);
      break;
    default:
      middlewareOptions = getAuthOptions(options);
      flowMiddleware = createAuthForClientCredentialsFlow(middlewareOptions);
      break;
  }

  return new ClientBuilder()
    .withMiddleware(flowMiddleware)
    .withMiddleware(createHttpClient(getHTTPMiddlewareOptions(options.hostApi || ROOT_API)))
    .build();
}

export default getClient;
