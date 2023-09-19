import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Link as LinkMui,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { FormEventHandler, useContext, useMemo } from 'react';
import { MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from 'next/link';
import PriceWithDiscount from '@/src/components/price/PriceWithDiscount';
import cartModel from '../helpers/commercetools/cart/cartModel';
import isAuthorized from '../helpers/auth';
import { AuthProps } from '../types/auth';
import MyContext from '../contexts/MyContext';
import { updateCart } from '../api/carts';
import { showError } from '../helpers/toastify';
import CartProductsList from '../components/CartProductsList';

export default function CartPage() {
  const { state, dispatch } = useContext(MyContext);
  const { lineItems = [] } = state.cart || {};

  const actionsForClearCart = useMemo(
    () =>
      lineItems.map<Omit<MyCartRemoveLineItemAction, 'action'>>((item) => ({
        lineItemId: item.id,
      })),
    [lineItems]
  );

  const totalPriceWithoutDiscountCode = useMemo(
    () =>
      lineItems.reduce(
        (accum, { price, quantity }) =>
          accum +
          (price?.discounted
            ? price.discounted.value.centAmount * quantity
            : price.value.centAmount * quantity),
        0
      ) / 100,
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

  const { version = 0, id = '', discountCodes = [], totalPrice } = state.cart;

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
      showError('This discount code does not exist or is no longer valid');
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '80vh' }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={(theme) => ({ color: theme.palette.primary.main })}
            variant="h4"
            component="h2"
          >
            Shopping Cart
          </Typography>

          <Button onClick={handleClearCart} variant="outlined" color="error" size="small">
            clear cart
          </Button>
        </Stack>

        <Paper sx={{ minWidth: '50vw' }}>
          {lineItems ? (
            <CartProductsList cart={state.cart} onChange={dispatch} />
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
            Total: ${totalPriceWithoutDiscountCode}
          </Typography>

          <Stack spacing={2} className="m-2">
            <Stack spacing={2}>
              <Stack gap={1} direction="row" flexWrap="wrap">
                {!!discountCodes.length &&
                  discountCodes.map(({ discountCode }) => (
                    <Stack spacing="2" direction="row" alignItems="center" key={discountCode.id}>
                      <Typography variant="h6" component="div">
                        {discountCode.obj?.code}
                      </Typography>
                      <IconButton onClick={handleRemoveDiscountCode}>
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </Stack>
                  ))}
              </Stack>
              <Box
                component="form"
                onSubmit={handleAddDiscountCode}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <TextField label="Have a promo?" required name="discountCode" size="small" />
                <Button type="submit" variant="outlined">
                  apply
                </Button>
              </Box>
            </Stack>

            <Divider />

            <Typography
              variant="h6"
              component={Stack}
              direction="row"
              justifyContent="end"
              gap={1}
              sx={{ fontWeight: 'bold', textAlign: 'end' }}
            >
              Total :
              <PriceWithDiscount
                price={totalPriceWithoutDiscountCode}
                priceWithDiscount={totalPrice.centAmount / 100}
              />
            </Typography>
          </Stack>
        </Paper>
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
    return {
      notFound: true,
    };
  }
};
