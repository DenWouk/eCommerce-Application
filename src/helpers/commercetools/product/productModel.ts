import { ClientResponse, SuggestionResult } from '@commercetools/platform-sdk';
import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req } from '@/src/types/commercetools';
import { SortOrder } from '@/src/helpers/commercetools/consts';

const LIMIT = 10;

const enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

export type FilterProducts = {
  search?: string;
  sort?: string;
  order?: Sort;
};

class ProductModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getProducts(req: Req, filter?: FilterProducts) {
    const { search, sort = 'price', order = SortOrder.DESC } = filter || {};
    let suggest: ClientResponse<SuggestionResult> | undefined;
    let searchString = search;
    if (searchString) {
      suggest = await (
        await this.builder.getBuilder(req)
      )
        .productProjections()
        .suggest()
        .get({
          queryArgs: {
            limit: LIMIT,
            fuzzy: true,
            'searchKeywords.en-US': `${search}`,
          },
        })
        .execute();

      const searchWords = Object.values(suggest.body)
        .flat()
        .map((value) => value.text);
      searchString = Array.from(new Set(searchWords.join(' ').split(' ')).values()).join(' ');
      searchString = searchString || search;
    }
    return (await this.builder.getBuilder(req))
      .productProjections()
      .search()
      .get(
        filter
          ? {
              queryArgs: {
                fuzzy: true,
                limit: LIMIT,
                priceCurrency: 'USD',
                priceCountry: 'US',
                filter: 'country="US"',
                markMatchingVariants: true,
                sort: sort && `${sort} ${order}`,
                'text.en-US': `${searchString}`,
              },
            }
          : {
              queryArgs: {
                limit: LIMIT,
                priceCurrency: 'USD',
                priceCountry: 'US',
                // filter: 'variants.scopedPrice:true',
                // filter: 'variants.scopedPrice.value.centAmount:range (* to 50000)',
                markMatchingVariants: true,
                localeProjection: 'US',
              },
            }
      )
      .execute();
  }

  async getProductByCategory(req: Req, id: string) {
    return (await this.builder.getBuilder(req))
      .productProjections()
      .search()
      .get({ queryArgs: { filter: `categories.id:subtree("${id}")`, expand: 'categories[*]' } })
      .execute();
  }

  async getProductCategory(req: Req) {
    return (await this.builder.getBuilder(req)).categories().get().execute();
  }

  // async getProductWithSort(req: Req, sort: { name: string; order: 'asc' }) {
  //   return (await this.builder.getBuilder(req))
  //     .productProjections()
  //     .search()
  //     .get({ queryArgs: { filter: `categories.id:subtree("${id}")`, expand: 'categories[*]' } })
  //     .execute();
  // }

  async getProductById(req: Req, id: string) {
    return (await this.builder.getBuilder(req))
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute();
  }
}

const productModel = new ProductModel(builderApiRoot);
export default productModel;
