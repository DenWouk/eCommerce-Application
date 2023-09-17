import { PropsWithChildren, useMemo, useReducer } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { SWRConfig, SWRConfiguration } from 'swr';
import MyContext, { ActionType, StateType } from '@/src/contexts/MyContext';
import Footer from './Footer';
import Header from './Header';

const SWRConfigValue: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const reducer = (state: StateType, { type, value }: ActionType) => {
  switch (type) {
    case 'CHANGE':
      return {
        ...state,
        countProductsInCart: value?.totalLineItemQuantity || 0,
        cart: value,
      };
    default:
      return state;
  }
};

type Props = PropsWithChildren & {
  pageProps: {
    authorized: boolean | undefined;
    cart: Cart | null;
  };
};

export default function Layout({ children, pageProps }: Props) {
  const { authorized = false, cart } = pageProps;
  const [state, dispatch] = useReducer(reducer, {
    authorized,
    cart,
    countProductsInCart: cart?.totalLineItemQuantity || 0,
  });
  const memoValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <SWRConfig value={SWRConfigValue}>
      <MyContext.Provider value={memoValue}>
        <Header authorized={pageProps.authorized} />
        <main>{children}</main>
        <Footer />
      </MyContext.Provider>
    </SWRConfig>
  );
}
