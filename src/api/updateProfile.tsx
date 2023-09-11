import { Customer } from '@commercetools/platform-sdk';
import getConfig from 'next/config';
import { IFormInput } from '../interfaces/IFormInput';

const { ROOT_APP = '' } = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

export default async function updateProfile(dataUpdate: IFormInput): Promise<Customer> {
  const data = await fetch(`${ROOT_APP}/api/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataUpdate),
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const body = await res.json();
    throw new Error(body.message);
  });
  return data.json();
}
