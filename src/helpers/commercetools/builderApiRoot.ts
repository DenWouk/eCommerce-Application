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
import { getToken } from 'next-auth/jwt';
import NamesClients from '@/src/helpers/commercetools/consts';
import { tokenCache } from '@/src/helpers/commercetools/token';
import { ClientOptions, ExistingTypeClient, Req, TypeClient } from '@/src/types/commercetools';

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
} = getConfig().serverRuntimeConfig as Record<string, string | undefined>;

export type TypeBuilderApiRoot = BuilderApiRoot;

class BuilderApiRoot {
  async getBuilder(req: Req) {
    const token = (await getToken({ req }))?.token?.token;
    return token ? this.createForExisting(token) : this.createForUnknown();
  }

  createForUnknown() {
    const scopes = SCOPE_UNKNOWN.split(' ');
    const client = this.getClientWithOptions(
      { type: NamesClients.UNKNOWN },
      { scopes, clientId: CLIENT_ID_UNKNOWN, clientSecret: CLIENT_SECRET_UNKNOWN }
    );
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
  }

  createForExisting(accessToken: string) {
    const client = this.getClientWithToken(accessToken);
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
  }

  createForCO() {
    const scopes = SCOPE_CO.split(' ');
    const client = this.getClientWithOptions(
      { type: NamesClients.UNKNOWN },
      { scopes, clientId: CLIENT_ID_CO, clientSecret: CLIENT_SECRET_CO }
    );
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
  }

  createForAnonymous() {
    const scopes = SCOPE_SPA.split(' ');
    const client = this.getClientWithOptions(
      { type: NamesClients.ANONYMOUS },
      { scopes, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET }
    );
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
  }

  createForUser(credentials: UserAuthOptions) {
    const scopes = SCOPE_SPA.split(' ');
    const client = this.getClientWithOptions(
      { type: NamesClients.PASSWORD, value: credentials },
      { scopes, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET }
    );
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PK });
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
      .withExistingTokenFlow(`Bearer ${accessToken}`, { force: true })
      .withHttpMiddleware({ host: ROOT_API, fetch })
      .build();
  }

  private getClientWithOptions(
    typeClient: Exclude<TypeClient, ExistingTypeClient>,
    options: ClientOptions
  ) {
    let middlewareOptions: AuthMiddlewareOptions | PasswordAuthMiddlewareOptions | undefined;
    let flowMiddleware: Middleware | undefined;
    const { type } = typeClient;
    tokenCache.clear();
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
}

const builderApiRoot = new BuilderApiRoot();
export default builderApiRoot;
