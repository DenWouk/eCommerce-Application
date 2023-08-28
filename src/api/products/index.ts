import { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import getConfig from 'next/config';

const { ROOT_APP = '' } = getConfig().serverRuntimeConfig as Record<string, string | undefined>;

export default async function getProducts(
  search: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  const data = await fetch(`${ROOT_APP}/api/products?search=${search}`, {
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
