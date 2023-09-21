import { Box } from '@mui/material';
import NamesClients from '@/src/helpers/commercetools/consts';
import { ssrWithAuthToken } from '@/src/helpers/next/withAuthToken';

export default function Home() {
  return (
    <div className="main-page-background">
        <div className="main-page-title">Welcome to our autohouse!</div>

      <div className="main-page-promocodes">Catch Promo Codes
      <div className="promocode-1">LuckyCustomer10</div>
      <div className="promocode-2">bmw-10</div>
      </div>
      {/* <Box
        sx={{
          position: 'absolute',
          top: '90px',
          px: '10px',
          fontSize: 'max(20px, 3vw)',
          color: 'var(--color2)',
          borderRadius: '3px',
          bgcolor: 'var(--background-color1)',
        }}
      >
        Promo codes LuckyCustomer10 
      </Box> */}
    </div>
  );
}

export const getServerSideProps = ssrWithAuthToken(async ({ token }) => {
  const authorized = token?.type === NamesClients.PASSWORD;
  return { props: { authorized } };
});
