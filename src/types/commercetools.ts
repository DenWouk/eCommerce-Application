import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import NamesClients, { SortOrder } from '@/src/helpers/commercetools/consts';

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

export type Req = GetServerSidePropsContext['req'] | NextRequest | NextApiRequest;

export type FetchedToken = {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
};

export type FilterProducts = {
  page?: number;
  category?: string;
  transmission?: string;
  body?: string;
  make?: string;
  offset?: number;
  search?: string;
  priceCountry?: string;
  priceCurrency?: string;
  localeProjection?: string;
  color?: string;
  sort?: string;
  facet?: string;
  limit?: string;
  order?: SortOrder;
  from?: string;
  to?: string;
};
