import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = PropsWithChildren & {
  pageProps: { authorized: boolean | undefined };
};

export default function Layout({ children, pageProps }: Props) {
  return (
    <>
      <Header authorized={pageProps.authorized} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
