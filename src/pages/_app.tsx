import './globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Layout from '../components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6195c3',
    },
  },
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <ToastContainer />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
