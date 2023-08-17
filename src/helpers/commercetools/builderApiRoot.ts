import getConfig from 'next/config';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  createAuthForAnonymousSessionFlow,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow,
  createAuthWithExistingToken,
  Middleware,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import NamesClients from '@/src/helpers/commercetools/consts';
import tokenCache from '@/src/helpers/commercetools/tokenCache';
import { ClientOptions, TypeClient } from '@/src/types/commercetools';
import getClient from '@/src/helpers/commercetools/getClient';

const {
  ROOT_AUTH = '',
  ROOT_API = '',
  SCOPE_SPA = '',
  CLIENT_ID = '',
  CLIENT_SECRET = '',
  SCOPE_CO = '',
  CLIENT_ID_CO = '',
  CLIENT_SECRET_CO = '',
  SCOPE_UNKNOWN = '',
  CLIENT_ID_UNKNOWN = '',
  CLIENT_SECRET_UNKNOWN = '',
  PROJECT_KEY: PK = '',
} = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

export default class BuilderApiRoot {
  constructor(private clientBuilder: ClientBuilder) {}

  private getAuthOptions(options: {
    scopes: string[];
    hostAuth?: string;
    clientId: string;
    clientSecret: string;
    projectKey?: string;
  }): AuthMiddlewareOptions;
  private getAuthOptions(
    options: {
      scopes: string[];
      hostAuth?: string;
      clientId: string;
      clientSecret: string;
      projectKey?: string;
    },
    user: UserAuthOptions
  ): PasswordAuthMiddlewareOptions;
  private getAuthOptions(
    options: {
      scopes: string[];
      hostAuth?: string;
      clientId: string;
      clientSecret: string;
      projectKey?: string;
    },
    user?: UserAuthOptions
  ): AuthMiddlewareOptions | PasswordAuthMiddlewareOptions {
    const { hostAuth = ROOT_AUTH, projectKey = PK, clientId, clientSecret, scopes } = options;
    const defCredentials = { clientId, clientSecret };
    const credentials = user ? { ...defCredentials, user } : defCredentials;
    return { host: hostAuth, projectKey, credentials, scopes, tokenCache };
  }

  private getClient(
    options: ClientOptions,
    typeClient: TypeClient = { type: NamesClients.UNKNOWN }
  ) {
    let middlewareOptions: AuthMiddlewareOptions | PasswordAuthMiddlewareOptions | undefined;
    let flowMiddleware: Middleware | undefined;
    const { type } = typeClient;

    switch (type) {
      case NamesClients.ANONYMOUS:
        middlewareOptions = this.getAuthOptions(options);
        flowMiddleware = createAuthForAnonymousSessionFlow(middlewareOptions);
        break;
      case NamesClients.PASSWORD:
        middlewareOptions = this.getAuthOptions(options, typeClient.value);
        flowMiddleware = createAuthForPasswordFlow(
          <PasswordAuthMiddlewareOptions>middlewareOptions
        );
        break;
      case NamesClients.EXISTING:
        flowMiddleware = createAuthWithExistingToken(`Bearer ${typeClient.value}`);
        break;
      default:
        middlewareOptions = this.getAuthOptions(options);
        flowMiddleware = createAuthForClientCredentialsFlow(middlewareOptions);
        break;
    }

    return new ClientBuilder()
      .withMiddleware(flowMiddleware)
      .withHttpMiddleware({ host: ROOT_API, fetch })
      .build();
  }

  getApiRootForUnknown() {
    const scopes = SCOPE_UNKNOWN.split(' ');
    const client = this.getClient({
      scopes,
      clientId: CLIENT_ID_UNKNOWN,
      clientSecret: CLIENT_SECRET_UNKNOWN,
    });
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
  }

  getApiRootForCO() {
    const scopes = SCOPE_CO.split(' ');
    const client = this.getClient({
      scopes,
      clientId: CLIENT_ID_CO,
      clientSecret: CLIENT_SECRET_CO,
    });
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
  }

  getApiRootForAnonymous() {
    const scopes = SCOPE_SPA.split(' ');
    const client = getClient(
      { scopes, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET },
      {
        type: NamesClients.ANONYMOUS,
      }
    );
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: PK,
    });
  }

  getApiRootForUser(userOrToken: UserAuthOptions) {
    const scopes = SCOPE_SPA.split(' ');
    const client = this.getClient(
      { scopes, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET },
      { type: NamesClients.PASSWORD, value: userOrToken }
    );
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
  }
}
