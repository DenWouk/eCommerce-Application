import './globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react';
import Layout from '../components/Layout';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <StrictMode>
      <SessionProvider session={session}>
        <ToastContainer />
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </StrictMode>
  );
}
