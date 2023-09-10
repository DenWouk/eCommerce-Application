import { QueryParam } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { SuggestionResult } from '@commercetools/platform-sdk';
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

function createQueryValue(searchQuery: string | string[] | undefined) {
  return (
    searchQuery &&
    [searchQuery]
      .flat()
      .map((value) => `"${value}"`)
      .join(',')
  );
}

export default function createQueryArgs(
  filter: (FilterProducts & { suggest?: SuggestionResult }) | undefined
) {
  const {
    search,
    suggest,
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
    from = '',
    to = '',
    sort = 'lastModifiedAt',
    order = SortOrder.ASC,
  } = filter || {};
  const filterQuery: string[] = [];
  const fromTo =
    (from || to) &&
    `variants.scopedPrice.value.centAmount:range (${+from * 100 || '*'} to ${+to * 100 || '*'})`;
  fromTo && filterQuery.push(fromTo);
  const colorQuery = createQueryValue(color);
  colorQuery && filterQuery.push(`variants.attributes.color.key:${colorQuery}`);
  const transmissionQuery = createQueryValue(transmission);
  transmissionQuery &&
    filterQuery.push(`variants.attributes.transmission.key:${transmissionQuery}`);
  const bodyQuery = createQueryValue(body);
  bodyQuery && filterQuery.push(`variants.attributes.body.key:${bodyQuery}`);
  const makeQuery = createQueryValue(make);
  makeQuery && filterQuery.push(`variants.attributes.make.key:${makeQuery}`);

  const limitNumber = (limit && parseInt(limit, 10)) || LIMIT;
  category && filterQuery.push(`categories.id:subtree("${category}")`);
  const suggestions = suggest?.['searchKeywords.en-US'];
  suggestions?.length &&
    filterQuery.push(
      `searchKeywords.en-US.text:${createQueryValue(suggestions.map((value) => value.text))}`
    );

  const queryArgs: QueryArgs = {
    fuzzy: true,
    where: 'masterVariant(name(en-US="BMW M5"))',
    markMatchingVariants: true,
    offset: page ? (+page - 1) * limitNumber : undefined,
    priceCountry,
    priceCurrency,
    localeProjection,
    filter: filterQuery.length ? filterQuery : ['variants.scopedPrice.value.currencyCode:"USD"'],
    facet: facet || 'variants.scopedPrice.value.currencyCode:"USD" counting products',
    sort: sort && `${sort} ${order}`,
    limit: limitNumber,
  };
  !suggestions?.length && search && (queryArgs['text.en-US'] = search);
  return queryArgs;
}
