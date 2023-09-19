import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Cart } from '@commercetools/platform-sdk';
import { HighlightOffRounded } from '@mui/icons-material';
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {lineItems ? (
        lineItems.map((item) => {
          const { price, name, variant, id: lineItemId, productId, totalPrice, quantity } = item;

          return (
            <Box key={item.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  minWidth: '50vw',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    m: '5px',
                    border: 'solid 1px #c5c4c4',
                    borderRadius: '3px',
                  }}
                >
                  <Image
                    src={variant?.images?.[0]?.url ?? ''}
                    alt={name['en-US']}
                    width={120}
                    height={90}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '120px',
                  }}
                >
                  <Box>
                    {name['en-US']}
                    <Divider />
                    <PriceProduct price={price} />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '50px',
                      border: 'solid 1px #c5c4c4',
                      borderRadius: '3px',
                    }}
                  >
                    <IconButton onClick={() => handleChange('remove', productId, lineItemId)}>
                      <RemoveCircleOutlineRoundedIcon sx={{ color: '#6195c3' }} />
                    </IconButton>
                    {quantity}
                    <IconButton
                      aria-label="add"
                      onClick={() => handleChange('add', productId, lineItemId)}
                    >
                      <AddCircleRoundedIcon sx={{ color: '#6195c3' }} />
                    </IconButton>
                  </Box>

                  <Box>{`= ${totalPrice.centAmount / 100}`}</Box>
                </Box>

                <Box>
                  <IconButton onClick={() => handleChange('delete', productId, lineItemId)}>
                    <HighlightOffRounded sx={{ fontSize: 30, color: '#CE5959' }} />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
            </Box>
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
