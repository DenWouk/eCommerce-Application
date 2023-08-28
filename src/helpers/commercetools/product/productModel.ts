import { ClientResponse, SuggestionResult } from '@commercetools/platform-sdk';
import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req } from '@/src/types/commercetools';

const LIMIT = 10;

class ProductModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getProducts(req: Req, search?: string) {
    let suggest: ClientResponse<SuggestionResult> | undefined;
    let searchString: string | undefined;
    if (search) {
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
        search
          ? {
              queryArgs: {
                limit: LIMIT,
                fuzzy: true,
                'text.en-US': `${searchString}`,
              },
            }
          : undefined
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
