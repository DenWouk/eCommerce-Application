import { Box, Button, Divider, Stack, Typography } from '@mui/material';
// import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
// import cartModel from '../helpers/commercetools/cart/cartModel';
// import isAuthorized from '../helpers/auth';
import { getCarts } from '../api/carts';

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
export default function CartPage() {
  const [cartInfo, setCartInfo] = useState({} as CartItemProps);
  const { lineItems } = cartInfo;
  // const amount = cartInfo.lineItems.length;
  console.log(cartInfo.lineItems, '???????????????');
  // console.log(amount, 'amount length =====')

  useEffect(() => {
    getCarts()
      .then((data) => setCartInfo(data))
      .catch((err) => {
        throw err;
      });
  }, [setCartInfo]);

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
      <Stack spacing={2}>
        {cartInfo.lineItems ? (
          cartInfo.lineItems.map((item) => {
            const { price, name, variant } = item;
            console.log(cartInfo.variant, 'variant');
            
            return (
              <Box key={item.id}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: '18px', fontWeight: 'bold', color: 'inherit' }}
                  >
                    Name:
                  </Typography>
                  {name['en-US']}
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: '18px', fontWeight: 'bold', color: 'inherit' }}
                  >
                    Image:
                  </Typography>
                  <img src={variant.images[0].url}/>
                 
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: '18px', fontWeight: 'bold', color: 'inherit' }}
                  >
                    Price:
                  </Typography>
                </Box>
                <Box>{price.value.centAmount}</Box>
                <Divider />
                <Box mt={2}>
                  <Typography variant="h5">
                    Total Cost: 
                    {/* ${cartTotal.toFixed(2)} */}
                  </Typography>
                </Box>
                <Box mt={2} mb={6}>
                  <Button variant="outlined">Checkout</Button>
                </Box>
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
      </Stack>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
//   const authorized = await isAuthorized({ req });
//   try {

//     // const customerResponse = await cartModel.getCart(req);
//     return { props: { authorized, customer: customerResponse.body } };
//   } catch {
//     return {
//       notFound: true,
//     };
//   }
// };
