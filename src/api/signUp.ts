import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import getConfig from 'next/config';

const { ROOT_APP = '' } = getConfig().publicRuntimeConfig as Record<string, string | undefined>;
export default async function signUp(
  customerDraft: CustomerDraft
): Promise<ClientResponse<CustomerSignInResult>> {
  const data = await fetch(`${ROOT_APP}/api/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerDraft),
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const body = await res.json();
    throw new Error(body.message);
  });
  return data.json();
}
