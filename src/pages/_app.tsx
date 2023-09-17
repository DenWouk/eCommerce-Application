import './globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { PropsWithChildren, StrictMode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Cart } from '@commercetools/platform-sdk';
import { Session } from 'next-auth';
import Layout from '../components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6195c3',
    },
  },
});

type Props = {
  session?: Session | null;
  authorized: boolean | undefined;
  children: PropsWithChildren;
  cart: Cart | null;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<Props>) {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          {/* <ShoppingCartProviderProps> */}
          <ToastContainer />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
