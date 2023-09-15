import { Cart, CartPagedQueryResponse } from '@commercetools/platform-sdk';
import {
  Action,
  CartAddDiscountCodeBody,
  CartAddProductBody,
  CartChangeQuantityProductBody,
  CartRemoveDiscountCodeBody,
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
  action: Extract<Action, 'addDiscountCode'>,
  body: CartAddDiscountCodeBody
): Promise<Cart>;
export async function updateCart(
  action: Extract<Action, 'removeDiscountCode'>,
  body: CartRemoveDiscountCodeBody
): Promise<Cart>;
export async function updateCart(
  action: Action,
  body:
    | CartAddProductBody
    | CartRemoveProductBody
    | CartChangeQuantityProductBody
    | CartAddDiscountCodeBody
    | CartRemoveDiscountCodeBody
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
