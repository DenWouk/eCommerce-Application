import { Box, Drawer, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import CartItem from './CartItem';

type CartListProps = {
    // cartItems: cartItems[];
    isOpen:boolean;
}
export default function Cart({ isOpen }:CartListProps) {
  const [open, setOpen] = useState(false);
  const { closeCart, cartItems } = useCartContext();
  // const anchor: Anchor = 'right';

  const handlerOpenDrawer = () => {
    if(!open){
    setOpen(true)
    }
    setOpen(false)
};
  const handlerCloseDrawer = () => setOpen(false);

  return (
    <Box sx={{ alignSelf: 'center' }}>
      <Drawer anchor='right' open={isOpen} onClose={handlerCloseDrawer}>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item}/>
      ))}
      </Drawer>
    </Box>
  );
}
