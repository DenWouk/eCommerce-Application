import { QueryParam } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { FilterProducts } from '@/src/types/commercetools';
import { LIMIT, SortOrder } from '@/src/helpers/commercetools/consts';

type QueryArgs = {
  where?: string;
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
  const {
    search,
    page = 1,
    category,
    priceCountry,
    priceCurrency = 'USD',
    localeProjection = 'US',
    color,
    transmission,
    make,
    body,
    facet,
    limit,
    from,
    to,
    sort = 'lastModifiedAt',
    order = SortOrder.ASC,
  } = filter || {};
  const filterQuery: string[] = [];
  const fromTo =
    (from || to) && `variants.scopedPrice.value.centAmount:range (${from || '*'} to ${to || '*'})`;
  fromTo && filterQuery.push(fromTo);
  color && filterQuery.push(`variants.attributes.color.key:"${color}"`);
  transmission && filterQuery.push(`variants.attributes.transmission.key:"${transmission}"`);
  make && filterQuery.push(`variants.attributes.make.key:"${make}"`);
  body && filterQuery.push(`variants.attributes.body.key:"${body}"`);

  const limitNumber = (limit && parseInt(limit, 10)) || LIMIT;
  category && filterQuery.push(`categories.id:subtree("${category}")`);

  const queryArgs: QueryArgs = {
    fuzzy: true,
    markMatchingVariants: true,
    offset: page ? (page - 1) * limitNumber : undefined,
    priceCountry,
    priceCurrency,
    localeProjection,
    filter: filterQuery.length ? filterQuery : ['variants.scopedPrice.value.currencyCode:"USD"'],
    facet: facet || 'variants.scopedPrice.value.currencyCode:"USD" counting products',
    sort: sort && `${sort} ${order}`,
    limit: limitNumber,
  };
  search && (queryArgs['text.en-US'] = search);

  return queryArgs;
}
