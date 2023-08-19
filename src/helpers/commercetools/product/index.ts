import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req } from '@/src/types/commercetools';

class ProductModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getProducts(req: Req) {
    return (await this.builder.getBuilder(req)).productProjections().get().execute();
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
