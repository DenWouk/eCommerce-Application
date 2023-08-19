import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';

class ProductModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getProducts() {
    return this.builder.getApiRoot().productProjections().get().execute();
  }

  getProductById(id: string) {
    return this.builder.getApiRoot().productProjections().withId({ ID: id }).get().execute();
  }
}

const productModel = new ProductModel(builderApiRoot);
export default productModel;
