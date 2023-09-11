import { SuggestionResult } from '@commercetools/platform-sdk';
import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { FilterProducts, Req } from '@/src/types/commercetools';
import createQueryArgs from '@/src/helpers/commercetools/product/queryArgs';
import { LIMIT } from '@/src/helpers/commercetools/consts';

class ProductModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  private async getProductsSuggest(req: Req, search: string, limit?: string) {
    const suggest = await (
      await this.builder.getBuilder(req)
    )
      .productProjections()
      .suggest()
      .get({
        queryArgs: {
          limit: (limit && parseInt(limit, 10)) || LIMIT,
          fuzzy: true,
          'searchKeywords.en-US': `${search}`,
        },
      })
      .execute();
    return suggest.body;
  }

  async getProducts(req: Req, filter?: FilterProducts) {
    const { search, limit } = filter || {};
    let searchString = search;
    let suggest: SuggestionResult | undefined;
    if (searchString) {
      suggest = await this.getProductsSuggest(req, searchString, limit);
      const searchWords = Object.values(suggest)
        .flat()
        .map((value) => value.text);
      searchString =
        Array.from(new Set(searchWords.join(' ').split(' ')).values()).join(' ') || undefined;
      searchString = searchString || search;
    }

    const queryArgs = createQueryArgs({ ...filter, search: searchString, suggest });
    return (await this.builder.getBuilder(req))
      .productProjections()
      .search()
      .get({ queryArgs })
      .execute();
  }

  async getProductByCategory(req: Req, id: string) {
    return (await this.builder.getBuilder(req))
      .productProjections()
      .search()
      .get({ queryArgs: { filter: `categories.id:"${id}"` } })
      .execute();
  }

  async getProductById(req: Req, id: string) {
    return (await this.builder.getBuilder(req))
      .productProjections()
      .withId({ ID: id })
      .get({ queryArgs: { priceCurrency: 'USD' } })
      .execute();
  }
}

const productModel = new ProductModel(builderApiRoot);
export default productModel;
