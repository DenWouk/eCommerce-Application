import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import getApiRootForUser from '@/src/helpers/commercetools/apiRootForUser';

export default class CustomerModel {
  private repository: ByProjectKeyRequestBuilder | undefined;

  constructor(repository?: ByProjectKeyRequestBuilder) {
    this.repository = repository;
  }

  async signIn(user: CustomerSignin) {
    const { email, password } = user;
    const apiRoot = getApiRootForUser({ username: email, password });
    return apiRoot.me().login().post({ body: user }).execute();
  }
}
