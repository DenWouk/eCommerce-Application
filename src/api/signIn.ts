import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

export default async function signIn(
  signInData: UserAuthOptions
): Promise<ClientResponse<CustomerSignInResult>> {
  const data = await fetch('http://localhost:3000/api/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signInData),
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const body = await res.json();
    throw new Error(body.message);
  });
  return data.json();
}
