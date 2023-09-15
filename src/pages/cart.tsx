import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import CarItem from '../components/CartItem';
import cartModel from '../helpers/commercetools/cart/cartModel';
import isAuthorized from '../helpers/auth';
import { AuthProps } from '../types/auth';
import MyContext from '../contexts/MyContext';

export default function CartPage() {
  const { state } = useContext(MyContext);

  if (!state.cart) {
    return <div>Cart empty</div>;
  }
  const { lineItems } = state.cart;
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
          <Button className="btn clear-btn">clear cart</Button>
          <Button variant="outlined">Checkout</Button>
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
