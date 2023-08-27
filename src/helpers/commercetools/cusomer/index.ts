import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req } from '@/src/types/commercetools';

class CustomerModel {
  constructor(private builder: TypeBuilderApiRoot) {}

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
}

const customerModel = new CustomerModel(builderApiRoot);
export default customerModel;
