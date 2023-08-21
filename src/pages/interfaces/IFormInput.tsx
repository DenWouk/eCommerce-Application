import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

type TypeAddress = {
  shippingAddress?: boolean;
  billingAddress?: boolean;
};

export interface IFormInput {
  gg: string;
  email: string;
  password: string;
  lastName?: string;
  firstName?: string;
  dateOfBirth: Date | null;
  checkbox?: boolean;
  addresses: (BaseAddress & TypeAddress)[];
  defaultShippingAddress: number | null;
  defaultBillingAddress: number | null;
}
