import { Customer } from '@commercetools/platform-sdk';
import { IFormInput } from '../interfaces/IFormInput';

export default async function updateProfile(dataUpdate: IFormInput): Promise<Customer> {
  const data = await fetch('/api/profile', {
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
