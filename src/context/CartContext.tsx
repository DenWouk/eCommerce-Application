import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContextType = {
  getItemsQuantity: (id: number) => number;
  increaseItems: (id: number) => void;
  decreaseItems: (id: number) => void;
  removeItems: (id: number) => void;
  //   openCart?: () => boolean;
  //   cartQuantity?: () => number;
};
type CartItem = {
  id: number;
  quantity: number;
};
const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useCartContext() {
  return useContext(ShoppingCartContext);
}
export function CartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems?.reduce((quantity, item) => item.quantity + quantity, 0);
  
  const getItemsQuantity = (id: number) => cartItems?.find((item) => item.id === id)?.quantity || 0;

  const increaseItems = (id: number) => {
    setCartItems((currItems) => {
      if (currItems!.find((item) => item.id === id) == null) {
        return [...currItems!, { id, quantity: 1 }];
      }
      return currItems!.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseItems = (id: number) => {
    setCartItems((currItems) => {
      if (currItems!.find((item) => item.id === id)?.quantity === 1) {
        return currItems?.filter((item) => item.id !== id);
      }
      return currItems!.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const removeItems = (id: number) => {
    setCartItems((currItems) => currItems?.filter((item) => item.id !== id));
  };
  const memoCart = useMemo(
    () => ({
      getItemsQuantity,
      increaseItems,
      decreaseItems,
      removeItems,
      openCart,
      closeCart,
      cartItems,
      cartQuantity,
    }),
    [cartItems, cartQuantity, getItemsQuantity]
  );
  return <ShoppingCartContext.Provider value={memoCart}>{children}</ShoppingCartContext.Provider>;
}
