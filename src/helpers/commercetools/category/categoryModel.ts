import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req } from '@/src/types/commercetools';

class CategoryModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getCategories(req: Req) {
    return (await this.builder.getBuilder(req)).categories().get().execute();
  }

  async getCategoryById(req: Req, id: string) {
    return (await this.builder.getBuilder(req)).categories().withId({ ID: id }).get().execute();
  }
}

const categoryModel = new CategoryModel(builderApiRoot);
export default categoryModel;
