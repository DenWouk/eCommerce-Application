import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material';
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

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '80vh' }}>
        <Typography variant="h6">Shopping Cart</Typography>

        <Paper>
          {lineItems ? (
            <>
              <CarItem />
              <Divider />
            </>
          ) : (
            <Typography
              sx={{
                textAlign: 'center',
              }}
              variant="subtitle1"
              gutterBottom
            >
              No items in the cart
            </Typography>
          )}

          <Typography variant="h6" sx={{ pr: '20px', fontWeight: 'bold', textAlign: 'end' }}>
            Total: ${(totalPrice?.centAmount || 0) / 100}
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {!!discountCodes.length &&
            discountCodes.map(({ discountCode }) => (
              <Box className="flex gap-1 items-center" key={discountCode.id}>
                <div>{discountCode.obj?.code}</div>
                <Button onClick={handleRemoveDiscountCode}>Remove discount code</Button>
              </Box>
            ))}

          <Box
            component="form"
            onSubmit={handleAddDiscountCode}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'end',
              alignItems: 'center',
              mt: '10px',
              mr: '5px',
            }}
          >
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Have a promo?</Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
              }}
            >
              <TextField required name="discountCode" size="small" />
              <Button type="submit" variant="outlined" sx={{ width: '125px', ml: '5px' }}>
                apply
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              onClick={handleClearCart}
              variant="outlined"
              color="error"
              sx={{
                width: '125px',
                height: '33px',
                mr: '5px',
              }}
            >
              clear cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });
  try {
    const cart = (await cartModel.getCart(req)).body;
    return { props: { authorized, cart } };
  } catch {
    return { props: { authorized, cart: null } };
  }
};
