import { CustomerDraft } from '@commercetools/platform-sdk';
import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import formatDate from '@/src/helpers/date';

import { IFormInput } from '@/src/interfaces/IFormInput';
import { countries } from '@/src/enums/countries';

export default function createCustomerDraft(data: IFormInput): CustomerDraft {
  const { dateOfBirth: day, addresses: baseAddresses, firstName, lastName, email, password } = data;

  const dateOfBirth = formatDate(day);
  const shippingAddresses: number[] = [];
  const billingAddresses: number[] = [];
  let defaultShippingAddress: number | undefined;
  let defaultBillingAddress: number | undefined;
  const addresses: BaseAddress[] = baseAddresses!.map((address, i) => {
    const {
      shippingAddress: sA,
      billingAddress: bA,
      defaultShippingAddress: defSa,
      defaultBillingAddress: defBa,
    } = address;
    const codeCountry = countries.find(
      (value: { label: string }) => value.label === address.country
    )?.code;
    if (!codeCountry) throw Error('Registration for your country is not available');
    sA && shippingAddresses.push(i);
    bA && billingAddresses.push(i);
    defSa && (defaultShippingAddress = i);
    defBa && (defaultBillingAddress = i);
    const {
      shippingAddress,
      billingAddress,
      defaultShippingAddress: dS,
      defaultBillingAddress: dB,
      ...rest
    } = address;
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
    defaultShippingAddress,
    defaultBillingAddress,
    shippingAddresses,
    billingAddresses,
    lastName,
    email,
    password,
    addresses,
    dateOfBirth,
  };
}
