import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

type TypeAddress = {
  id?: string;
  shippingAddress?: boolean;
  billingAddress?: boolean;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
};

export interface IFormInput {
  email?: string;
  password?: string;
  passwordOld?: string;
  passwordNew?: string;
  passwordConfirm?: string;
  lastName?: string;
  firstName?: string;
  dateOfBirth?: Date | string | null;
  checkbox?: boolean;
  addresses?: (BaseAddress & TypeAddress)[];
  currentAddresses?: BaseAddress[];
  form?: string;
  version?: number;
}
