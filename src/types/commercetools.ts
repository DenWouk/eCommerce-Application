import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import NamesClients from '@/src/helpers/commercetools/consts';

export type UnknownTypeClient = {
  type: NamesClients.UNKNOWN;
};

export type AnonymousTypeClient = {
  type: NamesClients.ANONYMOUS;
};

export type PasswordTypeClient = {
  type: NamesClients.PASSWORD;
  value: UserAuthOptions;
};

export type ExistingTypeClient = {
  type: NamesClients.EXISTING;
  value: string;
};

export type TypeClient =
  | UnknownTypeClient
  | AnonymousTypeClient
  | PasswordTypeClient
  | ExistingTypeClient;

export type ClientOptions = {
  scopes: string[];
  hostApi?: string;
  hostAuth?: string;
  clientId: string;
  clientSecret: string;
  projectKey?: string;
};
