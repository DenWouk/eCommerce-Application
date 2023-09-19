import { createContext, Dispatch } from 'react';
import { Cart } from '@commercetools/platform-sdk';

export type StateType = {
  countProductsInCart: number;
  authorized: boolean;
  cart: Cart | null;
};

export type ActionType = {
  type: 'CHANGE';
  value: Cart;
};

const initialState: StateType = {
  countProductsInCart: 0,
  authorized: false,
  cart: null,
};

const MyContext = createContext<{ state: StateType; dispatch: Dispatch<ActionType> }>({
  state: initialState,
  dispatch: () => null,
});

export default MyContext;
