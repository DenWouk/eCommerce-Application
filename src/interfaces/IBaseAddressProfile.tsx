import { BaseAddress } from '@commercetools/platform-sdk';

export interface IBaseAddressProfile extends BaseAddress {
  isDefault?: number;
  countryLabel: string;
}
