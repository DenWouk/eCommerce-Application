import { Cart } from '@commercetools/platform-sdk';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useMemo } from 'react';
import CartIconButton from '@/src/components/CartIconButton';
import NamesClients from '@/src/helpers/commercetools/consts';
import { showError } from '@/src/helpers/toastify';
import { getCarts, updateCart } from '@/src/api/carts';
import MyContext from '@/src/contexts/MyContext';

type Props = {
  productId: string;
};

export default function CartChangeCountItemsButton({ productId }: Props) {
  const { status } = useSession();
  const { state, dispatch } = useContext(MyContext);
  const { id = '', version = 0, lineItems = [] } = state.cart || {};
  const lineItemId = useMemo(
    () => lineItems?.find((value) => value.productId === productId)?.id,
    [lineItems, productId]
  );

  const handleChange = async (type: 'add' | 'remove') => {
    let cart: Cart | undefined;
    try {
      if (type === 'add') {
        let currenId = id;
        let currenVersion = version;
        if (status === 'unauthenticated') {
          const res = await signIn(NamesClients.ANONYMOUS, { redirect: false });
          if (res?.error) {
            showError('Oops, something went wrong, try again later');
            return;
          }
          const newCart = await getCarts();
          currenId = newCart.id;
          currenVersion = newCart.version;
        }

        cart = await updateCart('addLineItem', {
          id: currenId,
          version: currenVersion,
          actions: { productId, quantity: 1 },
        });
      } else {
        if (!lineItemId) {
          showError('Oops, something went wrong, try again later');
          return;
        }
        cart = await updateCart('removeLineItem', {
          id,
          version,
          actions: { lineItemId },
        });
      }

      dispatch({ type: 'CHANGE', value: cart });
    } catch {
      showError('Oops, something went wrong, try again later');
    }
  };

  return lineItemId ? (
    <CartIconButton onClick={handleChange} type="remove" />
  ) : (
    <CartIconButton onClick={handleChange} />
  );
}
