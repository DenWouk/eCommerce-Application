import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import {
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';
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
  page?: string;
  category?: string;
  transmission?: string | string[];
  body?: string | string[];
  make?: string | string[];
  color?: string | string[];
  offset?: string;
  search?: string;
  priceCountry?: string;
  priceCurrency?: string;
  localeProjection?: string;
  sort?: string;
  facet?: string;
  limit?: string;
  order?: SortOrder;
  from?: string;
  to?: string;
};

type ValueObjAttributesProduct = {
  key: string;
  label: string;
};

export type AttributesProduct = {
  body: ValueObjAttributesProduct[];
  color: ValueObjAttributesProduct[];
  engine: string;
  interior: string;
  location: string;
  make: ValueObjAttributesProduct[];
  model: string;
  odometer: number;
  price: string;
  transmission: ValueObjAttributesProduct[];
  year: string;
};

type UpdateAction = {
  id: string;
  version: number;
};

export type Action =
  | 'addLineItem'
  | 'removeLineItem'
  | 'changeLineItemQuantity'
  | 'addDiscountCode'
  | 'removeDiscountCode';

export type CartAddProductBody = UpdateAction & {
  actions: Omit<MyCartAddLineItemAction, 'action'>;
};

export type CartRemoveProductBody = UpdateAction & {
  actions: Omit<MyCartRemoveLineItemAction, 'action'>;
};

export type CartChangeQuantityProductBody = UpdateAction & {
  actions: Omit<MyCartChangeLineItemQuantityAction, 'action'>;
};

export type CartAddDiscountCodeBody = UpdateAction & {
  actions: Omit<MyCartAddDiscountCodeAction, 'action'>;
};

export type CartRemoveDiscountCodeBody = UpdateAction & {
  actions: Omit<MyCartRemoveDiscountCodeAction, 'action'>;
};

export type UpdateCartWithTypeAction =
  | { action: Extract<Action, 'addLineItem'>; updateData: CartAddProductBody }
  | { action: Extract<Action, 'removeLineItem'>; updateData: CartRemoveProductBody }
  | {
      action: Extract<Action, 'changeLineItemQuantity'>;
      updateData: CartChangeQuantityProductBody;
    }
  | { action: Extract<Action, 'addDiscountCode'>; updateData: CartAddDiscountCodeBody }
  | { action: Extract<Action, 'removeDiscountCode'>; updateData: CartRemoveDiscountCodeBody };
