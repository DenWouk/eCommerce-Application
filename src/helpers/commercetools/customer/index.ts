import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req } from '@/src/types/commercetools';
import apiRootForUnknown from '../apiRootForAnonymous';

class CustomerModel {
  private repository: ByProjectKeyRequestBuilder | undefined;

  constructor(private builder: TypeBuilderApiRoot) {
    // this.repository = repository;
  }

  async getMe(req: Req) {
    return (await this.builder.getBuilder(req)).me().get().execute();
  }

  async signIn(user: CustomerSignin) {
    const { email, password } = user;
    return this.builder
      .createForUser({ username: email, password })
      .me()
      .login()
      .post({ body: user })
      .execute();
  }

  async getProfile(req: Req) {
    return (await this.builder
      .getBuilder(req))
      .me()
      .get({queryArgs: {where: 'firstName'}})
      .execute();
  }
  async deleteCustomer(req: Req) {
    return (await apiRoot
    .me()
    .withId({ID: customerModel.body.customer.id})
    .delete({
      queryArgs: {version: customerModel.body.customer.version},

    })
    .execute()
}

const customerModel = new CustomerModel(builderApiRoot);
export default customerModel;
