import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req } from '@/src/types/commercetools';

class CustomerModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getMe(req: Req) {
    return (await this.builder.getBuilder(req)).me().get().execute();
  }
}

const customerModel = new CustomerModel(builderApiRoot);
export default customerModel;
