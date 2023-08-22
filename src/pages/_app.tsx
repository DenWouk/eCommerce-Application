import './globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/layout';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  );
}
