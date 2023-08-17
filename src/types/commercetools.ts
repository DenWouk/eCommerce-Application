import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import NamesClients from '@/src/helpers/commercetools/consts';

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

export type TypeClient =
  | UnknownTypeClient
  | AnonymousTypeClient
  | PasswordTypeClient
  | WithExistingTokenTypeClient;

export type ClientOptions = {
  scopes: string[];
  hostApi?: string;
  hostAuth?: string;
  clientId: string;
  clientSecret: string;
  projectKey?: string;
};
