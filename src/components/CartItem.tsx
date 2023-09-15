import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { Box, ButtonBase, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Cart } from '@commercetools/platform-sdk';
import { updateCart } from '@/src/api/carts';
import cartModel from '../helpers/commercetools/cart/cartModel';
import isAuthorized from '../helpers/auth';
import { AuthProps } from '../types/auth';
import MyContext from '../contexts/MyContext';
import PriceProduct from './price/PriceProduct';

export default function CartPage() {
  const { state, dispatch } = useContext(MyContext);

  if (!state.cart) {
    return <div>Cart empty</div>;
  }
  const { lineItems, version, id } = state.cart;

  const handleChange = async (
    type: 'add' | 'remove' | 'delete',
    productId: string,
    lineItemId: string
  ) => {
    let cart: Cart | undefined;
    if (type === 'add') {
      cart = await updateCart('addLineItem', {
        id,
        version,
        actions: { productId, quantity: 1 },
      });
    } else if (type === 'remove') {
      cart = await updateCart('removeLineItem', {
        id,
        version,
        actions: { lineItemId, quantity: 1 },
      });
    } else {
      cart = await updateCart('changeLineItemQuantity', {
        id,
        version,
        actions: { lineItemId, quantity: 0 },
      });
    }

    dispatch({ type: 'CHANGE', value: cart });
  };

  return (
    <Box>
      <Stack
        spacing={2}
        sx={{
          //   display: 'flex',
          flexDirection: 'space-beetwen',
          alignItems: 'center',
          margin: '0 1rem',
        }}
      >
        {lineItems ? (
          lineItems.map((item) => {
            const { price, name, variant, id: lineItemId, productId, totalPrice, quantity } = item;

            return (
              <Grid key={item.id} item xs={12} sm container>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Image
                      width={80}
                      height={80}
                      src={variant?.images?.[0]?.url ?? ''}
                      alt={name['en-US']}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container gap={2}>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item>{name['en-US']}</Grid>
                    <Grid item>
                      <PriceProduct price={price} />
                      Have a promo?
                    </Grid>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <IconButton onClick={() => handleChange('remove', productId, lineItemId)}>
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Box>
                <Box mt={3}>{quantity}</Box>
                <Box mt={3}>
                  <IconButton
                    aria-label="add"
                    onClick={() => handleChange('add', productId, lineItemId)}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                </Box>
                <Box mt={3}>{totalPrice.centAmount / 100}</Box>
                <Box mt={2}>
                  <IconButton onClick={() => handleChange('delete', productId, lineItemId)}>
                  <DeleteRoundedIcon />
                  </IconButton>
                </Box>
              </Grid>
            );
          })
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
