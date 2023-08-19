import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';

class CustomerModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getMe() {
    return this.builder.getApiRoot().me().get().execute();
  }
}

const customerModel = new CustomerModel(builderApiRoot);
export default customerModel;
