import getConfig from 'next/config';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  createAuthForAnonymousSessionFlow,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow,
  Middleware,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { getServerSession } from 'next-auth';
import NamesClients from '@/src/helpers/commercetools/consts';
import tokenCache from '@/src/helpers/commercetools/tokenCache';
import { ClientOptions, ExistingTypeClient, TypeClient } from '@/src/types/commercetools';

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

const passwordClientBuilder = new ClientBuilder();
const anonymousClientBuilder = new ClientBuilder();
const unknownClientBuilder = new ClientBuilder();

export type TypeBuilderApiRoot = BuilderApiRoot;

class BuilderApiRoot {
  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  getApiRoot() {
    const { token } = tokenCache.get();
    console.log(tokenCache.get(), 333);
    return this.apiRoot || (token ? this.createForExisting(token) : this.createForUnknown());
  }

  createForUnknown() {
    const scopes = SCOPE_UNKNOWN.split(' ');
    const client = this.getClientWithOptions(
      { type: NamesClients.UNKNOWN },
      { scopes, clientId: CLIENT_ID_UNKNOWN, clientSecret: CLIENT_SECRET_UNKNOWN }
    );
    const result = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
    this.apiRoot = result;
    return result;
  }

  createForExisting(accessToken: string) {
    const client = this.getClientWithToken(accessToken);
    const result = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
    this.apiRoot = result;
    return result;
  }

  createForCO() {
    const scopes = SCOPE_CO.split(' ');
    const client = this.getClientWithOptions(
      { type: NamesClients.UNKNOWN },
      { scopes, clientId: CLIENT_ID_CO, clientSecret: CLIENT_SECRET_CO }
    );
    const result = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
    this.apiRoot = result;
    return result;
  }

  createForAnonymous() {
    const scopes = SCOPE_SPA.split(' ');
    const client = this.getClientWithOptions(
      { type: NamesClients.ANONYMOUS },
      { scopes, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET }
    );
    const result = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
    this.apiRoot = result;
    return result;
  }

  createForUser(userOrToken: UserAuthOptions) {
    const scopes = SCOPE_SPA.split(' ');
    const client = this.getClientWithOptions(
      { type: NamesClients.PASSWORD, value: userOrToken },
      { scopes, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET }
    );
    const result = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
    this.apiRoot = result;
    return result;
  }

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

  private getClientWithToken(accessToken: string) {
    return new ClientBuilder()
      .withExistingTokenFlow(`Bearer ${accessToken}`)
      .withHttpMiddleware({ host: ROOT_API, fetch })
      .build();
  }

  private getClientWithOptions(
    typeClient: Exclude<TypeClient, ExistingTypeClient>,
    options: ClientOptions
  ) {
    let middlewareOptions: AuthMiddlewareOptions | PasswordAuthMiddlewareOptions | undefined;
    let flowMiddleware: Middleware | undefined;
    let clientBuilder: ClientBuilder | undefined;
    const { type } = typeClient;

    switch (type) {
      case NamesClients.ANONYMOUS:
        clientBuilder = anonymousClientBuilder;
        middlewareOptions = this.getAuthOptions(options!);
        flowMiddleware = createAuthForAnonymousSessionFlow(middlewareOptions);
        break;
      case NamesClients.PASSWORD:
        clientBuilder = passwordClientBuilder;
        middlewareOptions = this.getAuthOptions(options!, typeClient.value);
        flowMiddleware = createAuthForPasswordFlow(
          <PasswordAuthMiddlewareOptions>middlewareOptions
        );
        break;
      default:
        clientBuilder = unknownClientBuilder;
        middlewareOptions = this.getAuthOptions(options!);
        flowMiddleware = createAuthForClientCredentialsFlow(middlewareOptions);
        break;
    }

    return clientBuilder
      .withMiddleware(flowMiddleware)
      .withHttpMiddleware({ host: ROOT_API, fetch })
      .build();
  }
}

const builderApiRoot = new BuilderApiRoot();
export default builderApiRoot;
