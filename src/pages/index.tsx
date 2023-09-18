import { Button } from '@mui/material';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Cart } from '@commercetools/platform-sdk';
import NamesClients from '@/src/helpers/commercetools/consts';
import { ssrWithAuthToken } from '@/src/helpers/next/withAuthToken';
import cartModel from '@/src/helpers/commercetools/cart';

export type AuthProps = {
  authorized: boolean;
};

export default function Home({ authorized }: AuthProps) {
  return (
    <>
      <div className="auth-btns-duplicate">
        <Button component={Link} variant="outlined" href="/" sx={{ width: '95px' }}>
          Main
        </Button>

        <Button component={Link} variant="outlined" href="/sign-in" sx={{ width: '95px' }}>
          Sign in
        </Button>

        <Button component={Link} variant="outlined" href="/sign-up" sx={{ width: '95px' }}>
          Sign Up
        </Button>
      </div>

      <div className="auth-btns-container">
        <h2>{authorized ? 'Authorized' : 'Not authorized'}</h2>

        {!authorized && (
          <>
            <Button
              component={Link}
              variant="contained"
              href="/sign-in"
              sx={{ background: '#6195c3fe' }}
            >
              Sign in
            </Button>

            <Button
              component={Link}
              variant="contained"
              href="/sign-up"
              sx={{ background: '#6195c3fe' }}
            >
              Registration
            </Button>
          </>
        )}

        {authorized && (
          <Button
            component={Link}
            variant="contained"
            href=""
            sx={{ background: '#6195c3fe' }}
            onClick={async (e) => {
              e.preventDefault();
              await signOut();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = ssrWithAuthToken<AuthProps>(async ({ token, req }) => {
  const authorized = token?.type === NamesClients.PASSWORD;

  let cart: Cart | null;
  try {
    cart = (await cartModel.getCart(req)).body;
  } catch {
    cart = null;
  }

  return { props: { authorized, cart } };
});
