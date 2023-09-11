import { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import getConfig from 'next/config';

const { ROOT_APP = '' } = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

export default async function getProducts(
  searchString: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  const data = await fetch(`${ROOT_APP}/api/products?${searchString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const bodyRes = await res.json();
    throw new Error(bodyRes.message);
  });
  return data.json();
}
