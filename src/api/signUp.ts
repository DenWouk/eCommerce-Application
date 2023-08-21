import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';

export default async function signUp(
  customerDraft: CustomerDraft
): Promise<ClientResponse<CustomerSignInResult>> {
  const data = await fetch('http://localhost:3000/api/sign-up', {
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
