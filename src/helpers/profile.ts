import { countryPost } from '../enums/countries';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';

export default function prepareAddresses(
  addressesIds: string[],
  addresses: IBaseAddressProfile[],
  defaultAddress: string
) {
  return addressesIds
    .map((addressId: string) => {
      const addressFindO = addresses.find(
        (address: IBaseAddressProfile) => address.id === addressId
      );
      const addressFind = { ...addressFindO };
      const isDefault = addressFind!.id === defaultAddress;
      const code = addressFind!.country;
      const countryObj = countryPost.find((country) => country.code === code);

      addressFind!.countryLabel = countryObj!.label;
      addressFind!.isDefault = Number(isDefault);
      return addressFind as IBaseAddressProfile;
    })
    .sort(
      (a1: IBaseAddressProfile, a2: IBaseAddressProfile) =>
        (a2.isDefault as number) - (a1.isDefault as number)
    );
}
