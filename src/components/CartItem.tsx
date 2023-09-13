import { useCartContext } from "../context/CartContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cartItemsArr: CartItem = [{
    id: '8j1',
    name: 'hh',
  },{
      id: '8j2',
      name: 'boo',
    }];
type CartItemProps = {
    id:number;
    quantity:number;
}
export default CartItem({id, quantity}: CartItemProps){
    const {removeItems} = useCartContext();
    const item = cartItemsArr;  
}