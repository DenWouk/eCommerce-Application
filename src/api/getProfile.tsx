import getConfig from 'next/config';
import { Customer } from '@commercetools/platform-sdk';

const { ROOT_APP = '' } = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

export default async function getProfile(): Promise<Customer> {
  const data = await fetch(`${ROOT_APP}/api/profile`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const body = await res.json();
    throw new Error(body.message);
  });
  return data.json();
}
