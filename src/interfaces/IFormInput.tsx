import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

type TypeAddress = {
  shippingAddress?: boolean;
  billingAddress?: boolean;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
};

export interface IFormInput {
  email: string;
  password: string;
  lastName?: string;
  firstName?: string;
  dateOfBirth: Date | null;
  checkbox?: boolean;
  addresses: (BaseAddress & TypeAddress)[];
}
