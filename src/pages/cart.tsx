// import { Box, Button, Divider, Stack, Typography } from '@mui/material';
// import { GetServerSideProps } from 'next';
// import { useContext, useEffect, useState } from 'react';
// import cartModel from '../helpers/commercetools/cart/cartModel';
// import isAuthorized from '../helpers/auth';
// import { AuthProps } from '../types/auth';
// import MyContext from '../contexts/MyContext';
// // import { getCarts } from '../api/carts';

// type CartItemProps = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };
// export default function CartPage() {
//   const {state, dispatch} = useContext(MyContext);
//   console.log(state,'--------state-');

//   const cartInfo = state.cart;
  
//   // const [cartInfo, setCartInfo] = useState({} as CartItemProps);
//   const lineItems = cartInfo?.lineItems;
//   // const amount = cartInfo.lineItems.length;
//   console.log(lineItems, '???????????????');
//   // console.log(amount, 'amount length =====')

//   // useEffect(() => {
//   //   getCarts()
//   //     .then((data) => setCartInfo(data))
//   //     .catch((err) => {
//   //       throw err;
//   //     });
//   // }, [setCartInfo]);

//   return (
//     <Box>
//       <Typography
//         style={{
//           textAlign: 'center',
//         }}
//         variant="h4"
//         mb={10}
//       >
//         My Shopping Cart
//       </Typography>
//       <Stack spacing={2}>
//         {lineItems ? (
//           lineItems.map((item) => {
//             const { price, name, variant } = item;
//             console.log(variant, 'variant');
            
//             return (
//               <Box key={item.id}>
//                 <Box>
//                   <Typography
//                     variant="h4"
//                     sx={{ fontSize: '18px', fontWeight: 'bold', color: 'inherit' }}
//                   >
//                     Name:
//                   </Typography>
//                   {name['en-US']}
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h4"
//                     sx={{ fontSize: '18px', fontWeight: 'bold', color: 'inherit' }}
//                   >
//                     Image:
//                   </Typography>
//                   <img src={variant.images[0].url}/>
                 
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h4"
//                     sx={{ fontSize: '18px', fontWeight: 'bold', color: 'inherit' }}
//                   >
//                     Price:
//                   </Typography>
//                 </Box>
//                 <Box>{price.value.centAmount}</Box>
//                 <Divider />
//                 <Box mt={2}>
//                   <Typography variant="h5">
//                     Total Cost: 
//                     {/* ${cartTotal.toFixed(2)} */}
//                   </Typography>
//                 </Box>
//                 <Box mt={2} mb={6}>
//                   <Button variant="outlined">Checkout</Button>
//                 </Box>
//               </Box>
//             );
//           })
//         ) : (
//           <Typography
//             style={{
//               textAlign: 'center',
//             }}
//             variant="subtitle1"
//             gutterBottom
//           >
//             No items in the cart
//           </Typography>
//         )}
//       </Stack>
//     </Box>
//   );
// }

// export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
//   const authorized = await isAuthorized({ req });
//   try {

//     const cart = await cartModel.getCart(req);    
//     return { props: { authorized, cart } };
//   } catch {
//     return {
//       notFound: true,
//     };
//   }
// };
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { updateCart } from '@/src/api/carts';
import PriceTotal from '@/src/components/price/PriceTotal';
import PriceProduct from '@/src/components/price/PriceProduct';
import cartModel from '../helpers/commercetools/cart/cartModel';
import isAuthorized from '../helpers/auth';
import { AuthProps } from '../types/auth';
import MyContext from '../contexts/MyContext';

export default function CartPage() {
  const { state, dispatch } = useContext(MyContext);

  if (!state.cart) {
    return <div>Cart empty</div>;
  }
  const { lineItems, version, id } = state.cart;

  const handleChange = async (type: 'add' | 'remove', productId: string, lineItemId: string) => {
    let cart: Cart | undefined;
    if (type === 'add') {
      cart = await updateCart('addLineItem', {
        id,
        version,
        actions: { productId, quantity: 1 },
      });
    } else {
      cart = await updateCart('removeLineItem', {
        id,
        version,
        actions: { lineItemId, quantity: 1 },
      });
    }

    dispatch({ type: 'CHANGE', value: cart });
  };

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
        {lineItems ? (
          lineItems.map((item) => {
            const { price, name, variant, id: lineItemId, productId, totalPrice, quantity } = item;

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
                  <img src={variant?.images?.[0]?.url} />
                </Box>
                <div>Quantity: {quantity}</div>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: '18px', fontWeight: 'bold', color: 'inherit' }}
                  >
                    Price:
                  </Typography>
                </Box>

                <PriceProduct price={price} />

                <Divider />

                <Button onClick={() => handleChange('add', productId, lineItemId)}>Add</Button>
                <Button onClick={() => handleChange('remove', productId, lineItemId)}>
                  Remove
                </Button>

                <Box mt={2}>
                  <Typography variant="h5">
                    Total Cost:
                    <PriceTotal lineItem={item} />
                    {totalPrice.centAmount / 100}
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
