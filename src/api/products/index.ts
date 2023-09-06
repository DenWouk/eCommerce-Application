import { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import getConfig from 'next/config';
import { FilterProducts } from '@/src/types/commercetools';

const { ROOT_APP = '' } = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

export default async function getProducts(
  filter: FilterProducts
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  const { search, color, sort, from, to } = filter;
  const query = new URLSearchParams();
  from && query.set('from', from);
  to && query.set('to', to);
  search && query.set('search', search);
  sort && query.set('sort', sort);
  color && query.set('color', color);
  const data = await fetch(`${ROOT_APP}/api/products?${query}`, {
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
