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

    const searchWords = Object.values(suggest.body)
      .flat()
      .map((value) => value.text);
    return Array.from(new Set(searchWords.join(' ').split(' ')).values()).join(' ') || undefined;
  }

  async getProducts(req: Req, filter?: FilterProducts) {
    const { search, limit } = filter || {};
    let searchString = search;
    if (searchString) {
      const suggest = await this.getProductsSuggest(req, searchString, limit);
      searchString = suggest || search;
    }

    const queryArgs = createQueryArgs({ ...filter, search: searchString });
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
      .get()
      .execute();
  }
}

const productModel = new ProductModel(builderApiRoot);
export default productModel;
