import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  Link as LinkMui,
  IconButton,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { FormEventHandler, useContext, useMemo, useState } from 'react';
import { MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';
import Link from 'next/link';
import { HighlightOffRounded } from '@mui/icons-material';
import ModalClearCart from '@/src/components/ModalClearCart';
import CartItemsList from '../components/CartItemsList';
import cartModel from '../helpers/commercetools/cart/cartModel';
import isAuthorized from '../helpers/auth';
import { AuthProps } from '../types/auth';
import MyContext from '../contexts/MyContext';
import { updateCart } from '../api/carts';
import { showError } from '../helpers/toastify';

export default function CartPage() {
  const [open, setOpen] = useState(false);
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
    return (
      <div>
        Cart empty. Go to the{' '}
        <LinkMui component={Link} href="/products">
          Cars
        </LinkMui>{' '}
        page to add a car to your cart.
      </div>
    );
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
  const handleRemoveDiscountCode = async (discountCodeId: string) => {
    try {
      const updatedCart = await updateCart('removeDiscountCode', {
        id,
        version,
        actions: { discountCode: { id: discountCodeId, typeId: 'discount-code' } },
      });
      dispatch({ type: 'CHANGE', value: updatedCart });
    } catch {
      showError('There is no such discount code');
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
      showError('There is no such discount code');
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', px: '6px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '80vh' }}>
        <Typography variant="h5" component="h2">
          Shopping Cart
        </Typography>

        <Paper>
          {lineItems ? (
            <>
              <CartItemsList />
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

          <Typography
            variant="h6"
            sx={{ p: '10px', pr: '20px', fontWeight: 'bold', textAlign: 'end' }}
          >
            Total: ${(totalPrice?.centAmount || 0) / 100}
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
          {!!discountCodes.length &&
            discountCodes.map(({ discountCode }) => (
              <Box className="flex gap-1 items-center" key={discountCode.id}>
                <div>{discountCode.obj?.code}</div>
                <IconButton onClick={() => handleRemoveDiscountCode(discountCode.id)}>
                  <HighlightOffRounded sx={{ fontSize: 30, color: '#CE5959' }} />
                </IconButton>
              </Box>
            ))}

          <Box
            component="form"
            onSubmit={handleAddDiscountCode}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              mt: '5px',
              mr: '5px',
            }}
          >
            <TextField
              label="Promo LuckyCustomer10"
              placeholder="LuckyCustomer10"
              required
              name="discountCode"
              size="small"
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{ width: '125px', height: '40px', ml: '5px' }}
            >
              apply
            </Button>
          </Box>

          <ModalClearCart open={open} onConfirm={handleClearCart} onCancel={() => setOpen(false)} />

          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            color="error"
            sx={{
              width: '125px',
              height: '33px',
              mt: '10px',
              mr: '5px',
            }}
          >
            clear cart
          </Button>
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
