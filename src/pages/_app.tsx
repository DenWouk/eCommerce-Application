import './globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { SWRConfig, SWRConfiguration } from 'swr';
import Layout from '../components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6195c3',
    },
  },
});

const SWRConfigValue: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          {/* <ShoppingCartProviderProps> */}
          <ToastContainer />
          <SWRConfig value={SWRConfigValue}>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
          {/* </ShoppingCartProviderProps> */}
        </SessionProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
