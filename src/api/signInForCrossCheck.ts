import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import getConfig from 'next/config';

type Token = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

const {
  ROOT_AUTH = '',
  ROOT_API = '',
  PROJECT_KEY = '',
  CLIENT_ID_CO = '',
  CLIENT_SECRET_CO = '',
  SCOPE_CO = '',
} = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

export async function getTokenForCrosscheck(data?: UserAuthOptions): Promise<Token> {
  let url = '';
  if (data) {
    url = `${ROOT_AUTH}/oauth/${PROJECT_KEY}/customers/token?grant_type=password&username=${data.username}&password=${data.password}&scope=${SCOPE_CO}`;
  } else {
    url = `${ROOT_AUTH}/oauth/token?grant_type=client_credentials&scope=${SCOPE_CO}`;
  }

  const basicValue = btoa(`${CLIENT_ID_CO}:${CLIENT_SECRET_CO}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicValue}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }

    const { message, error } = (await res.json()) as {
      message: string | undefined;
      error: string | undefined;
    };
    if (error === 'InvalidCredentials' || error === 'invalid_customer_account_credentials') {
      throw new Error(message);
    } else {
      throw new Error('Oops, something went wrong, try again later');
    }
  });
  return response.json();
}

export async function signInForCrosscheck(
  { username, password }: UserAuthOptions,
  accessToken: string
): Promise<ClientResponse<CustomerSignInResult>> {
  const url = `${ROOT_API}/${PROJECT_KEY}/login`;

  const data = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: username, password }),
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }

    const { message, error } = (await res.json()) as {
      message: string | undefined;
      error: string | undefined;
    };
    if (error === 'InvalidCredentials' || error === 'invalid_customer_account_credentials') {
      throw new Error(message);
    } else {
      throw new Error('Oops, something went wrong, try again later');
    }
  });
  return data.json();
}
