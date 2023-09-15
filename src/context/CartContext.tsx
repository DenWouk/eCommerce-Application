import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-cycle
import CartList from '../components/CartList';

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContextType = {
  getItemsQuantity: (id: string) => number;
  increaseItems: (id: string) => void;
  decreaseItems: (id: string) => void;
  removeItems: (id: string) => void;
  openCart: () => boolean;
  cartQuantity?: number;
  cartItems: CartItem[] | undefined;
};
type CartItem = {
  id: string;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useCartContext() {
  return useContext(ShoppingCartContext);
}
export function CartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>();

  const openCart = useCallback(() => {
    setIsOpen(true);
    return true;
  }, []);
  const closeCart = useCallback(() => {
    setIsOpen(false);
    return false;
  }, []);

  const cartQuantity = cartItems?.reduce((quantity, item) => item.quantity + quantity, 0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getItemsQuantity = (id: string) => cartItems?.find((item) => item.id === id)?.quantity || 0;

  const increaseItems = useCallback((id: string) => {
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
  }, []);

  const decreaseItems = useCallback((id: string) => {
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
  }, []);

  const removeItems = useCallback((id: string) => {
    setCartItems((currItems) => currItems?.filter((item) => item.id !== id));
  }, []);

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
    [
      getItemsQuantity,
      increaseItems,
      decreaseItems,
      removeItems,
      openCart,
      closeCart,
      cartQuantity,
      cartItems,
    ]
  );
  return (
    <ShoppingCartContext.Provider value={memoCart}>
      {children}
      <CartList isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}

export { useContext };
