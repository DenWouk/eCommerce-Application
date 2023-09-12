import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req, UpdateCartWithTypeAction } from '@/src/types/commercetools';

class CartModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getCart(req: Req) {
    return (await this.builder.getBuilder(req)).me().carts().get().execute();
  }

  async createCart(req: Req) {
    return (await this.builder.getBuilder(req))
      .me()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute();
  }

  async updateCart(req: Req, body: UpdateCartWithTypeAction) {
    const {
      action,
      updateData: { id, version, actions },
    } = body;
    return (await this.builder.getBuilder(req))
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { version, actions: [{ ...actions, action }] } })
      .execute();
  }
}

const cartModel = new CartModel(builderApiRoot);
export default cartModel;
