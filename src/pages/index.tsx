import { Button } from '@mui/material';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import NamesClients from '@/src/helpers/commercetools/consts';

export type AuthProps = {
  authorized: boolean;
};

export default function Home({ authorized }: AuthProps) {
  const router = useRouter();
  return (
    <>
      <div className='auth-btns-duplicate'>
        <Button
          component={Link}
          variant="outlined"
          href="/sign-in"
        >
          Sign in
        </Button>

        <Button
          component={Link}
          variant="outlined"
          href="/sign-up"
        >
          Registration
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
            onClick={async () => {
              await signOut({ redirect: false });
              router.push('/');
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = (await getToken({ req }))?.type === NamesClients.PASSWORD;
  return { props: { authorized } };
};
