import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import getConfig from "next/config";

const { ROOT_API= '', PROJECT_KEY = '' } = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

export async function signUpForCrosscheck(
  customerDraft: CustomerDraft, accessToken: string
): Promise<ClientResponse<CustomerSignInResult>> {
  const url = `${ROOT_API}/${PROJECT_KEY}/customers`

  const data = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` ,'Content-Type': 'application/json' },
    body: JSON.stringify(customerDraft),
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const {message, errors} = await res.json() as {message?: string, errors?: {code?: string}[]};
    const code = errors?.[0]?.code;
    if (code === 'DuplicateField' || code === 'invalid_customer_account_credentials') {
      throw new Error(message);
    } else {
      throw new Error('Oops, something went wrong, try again later');
    }
  });
  return data.json();
}
