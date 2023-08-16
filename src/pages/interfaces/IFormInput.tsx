import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

type TypeAddress = {
  shippingAddress?: string;
  billingAddress?: string;
};

export interface IFormInput {
  email: string;
  password: string;
  lastName?: string;
  firstName?: string;
  dateOfBirth?: Date;
  checkbox?: boolean;
  addresses: (BaseAddress & TypeAddress)[];
  defaultShippingAddress?: string;
  defaultBillingAddress?: string;
}
