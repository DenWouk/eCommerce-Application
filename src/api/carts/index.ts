import { Cart, CartPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import {
  Action,
  CartAddProductBody,
  CartChangeQuantityProductBody,
  CartRemoveProductBody,
} from '@/src/types/commercetools';

export async function getCarts(): Promise<CartPagedQueryResponse> {
  const data = await fetch('/api/carts').then(async (res) => {
    if (res.ok) {
      return res;
    }
    const bodyRes = await res.json();
    throw new Error(bodyRes.message);
  });
  return data.json();
}

export async function updateCart(
  action: Extract<Action, 'addLineItem'>,
  body: CartAddProductBody
): Promise<Cart>;
export async function updateCart(
  action: Extract<Action, 'removeLineItem'>,
  body: CartRemoveProductBody
): Promise<Cart>;
export async function updateCart(
  action: Extract<Action, 'changeLineItemQuantity'>,
  body: CartChangeQuantityProductBody
): Promise<Cart>;
export async function updateCart(
  action: Action,
  body: CartAddProductBody | CartRemoveProductBody | CartChangeQuantityProductBody
): Promise<Cart> {
  const data = await fetch('/api/carts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, updateData: body }),
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const bodyRes = await res.json();
    throw new Error(bodyRes.message);
  });
  return data.json();
}
