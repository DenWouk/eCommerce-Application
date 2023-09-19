import { Address } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { countryPost } from '../enums/countries';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';

export default function prepareAddresses(
  addressesIds: string[],
  addresses: Address[],
  defaultAddress: string
) {
  return addressesIds
    .map((addressId: string) => {
      const addressFindO = addresses.find((address) => address.id === addressId)!;

      const isDefault = addressFindO.id === defaultAddress;
      const code = addressFindO.country;
      const countryObj = countryPost.find((country) => country.code === code)!;
      const addressFind: IBaseAddressProfile = {
        ...addressFindO,
        countryLabel: countryObj.label,
        isDefault: Number(isDefault),
      };
      return addressFind;
    })
    .sort((a1, a2) => a2.isDefault - a1.isDefault);
}
