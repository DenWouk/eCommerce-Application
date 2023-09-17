import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { FormEventHandler, useContext, useMemo } from 'react';
import { MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';
import CarItem from '../components/CartItem';
import cartModel from '../helpers/commercetools/cart/cartModel';
import isAuthorized from '../helpers/auth';
import { AuthProps } from '../types/auth';
import MyContext from '../contexts/MyContext';
import { updateCart } from '../api/carts';
import { showError } from '../helpers/toastify';

export default function CartPage() {
  const { state, dispatch } = useContext(MyContext);
  const { lineItems = [], version = 0, id = '', discountCodes = [], totalPrice } = state.cart || {};
console.log(totalPrice, 'totalPrice');

  const actionsForClearCart = useMemo(
    () =>
      lineItems.map<Omit<MyCartRemoveLineItemAction, 'action'>>((item) => ({
        lineItemId: item.id,
      })),
    [lineItems]
  );
  if (!state.cart?.lineItems?.length) {
    return <div>Cart empty</div>;
  }
  const handleClearCart = async () => {
    try {
      const cart = await updateCart('removeLineItem', {
        id,
        version,
        actions: actionsForClearCart,
      });
      dispatch({ type: 'CHANGE', value: cart });
    } catch {
      showError('Oops, something went wrong, try again later');
    }
  };
  const handleRemoveDiscountCode = async () => {
    const { id: discountCodeId, typeId } = discountCodes[0].discountCode;
    try {
      const updatedCart = await updateCart('removeDiscountCode', {
        id,
        version,
        actions: { discountCode: { id: discountCodeId, typeId } },
      });
      dispatch({ type: 'CHANGE', value: updatedCart });
    } catch {
      showError('Oops, something went wrong, try again later');
    }
  };
  const handleAddDiscountCode: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const code = currentTarget?.discountCode?.value;
    try {
      const updatedCart = await updateCart('addDiscountCode', { id, version, actions: { code } });
      currentTarget.reset();
      dispatch({ type: 'CHANGE', value: updatedCart });
    } catch {
      showError('Oops, something went wrong, try again later');
    }
  };
  // const { lineItems } = state.cart;
  const totalCostValue = lineItems.reduce(
    (total, item) => total + item.totalPrice.centAmount / 100,
    0
  );

  return (
    <Box>
      <Typography
        style={{
          textAlign: 'center',
        }}
        variant="h4"
        mb={10}
      >
        My Shopping Cart
      </Typography>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'space-beetwen',
          alignItems: 'center',
          margin: '0 1rem',
        }}
      >
        {lineItems ? (
          <Grid container spacing={2}>
            <CarItem />
            <Divider />
          </Grid>
        ) : (
          <Typography
            style={{
              textAlign: 'center',
            }}
            variant="subtitle1"
            gutterBottom
          >
            No items in the cart
          </Typography>
        )}
        <Divider />

        <Box mt={2} mb={6}>
          <div className="cart-total">
            <h4>${totalCostValue}</h4>
          </div>
          {!!discountCodes.length &&
            discountCodes.map(({ discountCode }) => (
              <Box className="flex gap-1 items-center" key={discountCode.id}>
                <div>{discountCode.obj?.code}</div>
                <Button onClick={handleRemoveDiscountCode}>Remove discount code</Button>
              </Box>
            ))}

          <form onSubmit={handleAddDiscountCode}>
            <TextField required name="discountCode" />
            <Button type="submit">apply</Button>
          </form>
          <Button variant="outlined" onClick={handleClearCart}>
            clear cart
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });
  try {
    const cart = (await cartModel.getCart(req)).body;
    return { props: { authorized, cart } };
  } catch {
    return {
      notFound: true,
    };
  }
};
