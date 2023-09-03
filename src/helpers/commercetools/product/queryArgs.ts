import { QueryParam } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { FilterProducts } from '@/src/types/commercetools';
import { LIMIT } from '@/src/helpers/commercetools/consts';

type QueryArgs = {
  fuzzy: boolean;
  markMatchingVariants: boolean;
  filter: string | string[] | undefined;
  facet?: string | string[];
  sort?: string | string[];
  limit: number;
  offset?: number;
  withTotal?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  localeProjection: string;
  [key: string]: QueryParam;
};

export default function createQueryArgs(filter: FilterProducts | undefined) {
  const { search, color, facet, limit, from, to, sort, order } = filter || {};
  const filterQuery: string[] = [];
  const fromTo =
    (from || to) && `variants.scopedPrice.value.centAmount:range (${from || '*'} to ${to || '*'})`;
  fromTo && filterQuery.push(fromTo);
  const colorQuery = color && `variants.attributes.color.key:"${color}"`;
  colorQuery && filterQuery.push(colorQuery);

  const queryArgs: QueryArgs = {
    fuzzy: true,
    markMatchingVariants: true,
    priceCurrency: 'USD',
    priceCountry: 'US',
    localeProjection: 'US',
    filter: filterQuery.length ? filterQuery : ['variants.scopedPrice.value.currencyCode:"USD"'],
    facet: facet || 'variants.scopedPrice.value.currencyCode:"USD" counting products',
    sort: sort && `${sort} ${order}`,
    limit: (limit && parseInt(limit, 10)) || LIMIT,
  };
  search && (queryArgs['text.en-US'] = search);

  return queryArgs;
}
