import { Box, Button, Typography, Container, Divider } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { useCartContext } from '../context/CartContext';
//   import { CartItemView } from "./CartItem";

export default function CartList({isOpen}:CartListProps) {
  const { cartQuantity, cartItems } = useCartContext();
  return (
    <Container>
      <Typography
        style={{
          textAlign: 'center',
        }}
        variant="h3"
        mb={10}
      >
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography
          style={{
            textAlign: 'center',
          }}
          variant="subtitle1"
          gutterBottom
        >
          Your cart is empty
        </Typography>
      ) : (
        <>
          {cartItems.map((item: any) => (
            <Box key={item.product.id} mb={6}>
              {/* <CartItemView item={item} /> */}
            </Box>
          ))}

          <Divider />

          <Box mt={2}>
            <Typography variant="h5">Total Cost: ${cartQuantity!.toFixed(2)}</Typography>
          </Box>

          <Box mt={2} mb={6}>
            <Button variant="outlined">Checkout</Button>
          </Box>
        </>
      )}
    </Container>
  );
}
