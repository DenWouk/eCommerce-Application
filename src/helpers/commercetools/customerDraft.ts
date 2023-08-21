import { CustomerDraft } from '@commercetools/platform-sdk';
import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import formatDate from '@/src/helpers/date';

import { IFormInput } from '@/src/pages/interfaces/IFormInput';
import { countries } from '@/src/pages/enums/countries';

export default function createCustomerDraft(data: IFormInput): CustomerDraft {
  const {
    dateOfBirth: day,
    addresses: baseAddresses,
    firstName,
    lastName,
    email,
    password,
    defaultShippingAddress,
  } = data;

  const dateOfBirth = formatDate(day);
  const shippingAddresses: number[] = [];
  const billingAddresses: number[] = [];
  const addresses: BaseAddress[] = baseAddresses.map((address) => {
    const { shippingAddress: sAd, billingAddress: bAd } = address;
    const codeCountry = countries.find(
      (value: { label: string }) => value.label === address.country
    )?.code;
    if (!codeCountry) throw Error('Фиг табе ,а не регистрация');
    sAd !== undefined && shippingAddresses.push(parseInt(sAd, 10));
    bAd !== undefined && billingAddresses.push(parseInt(bAd, 10));
    const { shippingAddress, billingAddress, ...rest } = address;
    return {
      ...rest,
      country: codeCountry,
      email,
      firstName,
      lastName,
    };
  });
  return {
    firstName,
    defaultShippingAddress:
      defaultShippingAddress !== undefined ? +defaultShippingAddress : undefined,
    shippingAddresses,
    billingAddresses,
    lastName,
    email,
    password,
    addresses,
    dateOfBirth,
  };
}
