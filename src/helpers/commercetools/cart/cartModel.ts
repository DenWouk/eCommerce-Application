import { CartDraft, MyCartUpdateAction } from '@commercetools/platform-sdk';
import builderApiRoot, { TypeBuilderApiRoot } from '@/src/helpers/commercetools/builderApiRoot';
import { Req, UpdateCartWithTypeAction } from '@/src/types/commercetools';

class CartModel {
  constructor(private builder: TypeBuilderApiRoot) {}

  async getCart(req: Req) {
    return (await this.builder.getBuilder(req))
      .me()
      .activeCart()
      .get({ queryArgs: { expand: 'discountCodes[*].discountCode.obj' } })
      .execute();
  }

  async createCart(req: Req, body: CartDraft | null) {
    return (await this.builder.getBuilder(req))
      .me()
      .carts()
      .post({
        body: body || { currency: 'USD' },
        queryArgs: { expand: 'discountCodes[*].discountCode.obj' },
      })
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
      .post({
        body: { version, actions: [{ ...actions, action } as MyCartUpdateAction] },
        queryArgs: { expand: 'discountCodes[*].discountCode.obj' },
      })
      .execute();
  }
}

const cartModel = new CartModel(builderApiRoot);
export default cartModel;
