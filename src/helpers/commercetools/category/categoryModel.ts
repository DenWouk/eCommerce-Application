import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req } from '@/src/types/commercetools';

class CategoryModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getCategories(req: Req) {
    return (await this.builder.getBuilder(req))
      .categories()
      .get({
        queryArgs: { limit: 200 },
      })
      .execute();
  }

  async getCategoryById(req: Req, id: string) {
    return (await this.builder.getBuilder(req)).categories().withId({ ID: id }).get().execute();
  }

  async getCategoryBySlug(req: Req, slug?: string) {
    const queryArgs = slug ? { where: `slug(en-US="${slug}")` } : undefined;
    return (await this.builder.getBuilder(req)).categories().get({ queryArgs }).execute();
  }
}

const categoryModel = new CategoryModel(builderApiRoot);
export default categoryModel;
