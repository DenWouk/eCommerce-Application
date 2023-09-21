import NamesClients from '@/src/helpers/commercetools/consts';
import { ssrWithAuthToken } from '@/src/helpers/next/withAuthToken';

export default function Home() {
  return (
    <div className="main-page-background">
      <div className="main-page-title">Welcome to our autohouse!</div>

      <div className="main-page-promocodes">
        Catch Promo Codes
        <div className="promocode-1">LuckyCustomer10</div>
        <div className="promocode-2">bmw-10</div>
      </div>
    </div>
  );
}

export const getServerSideProps = ssrWithAuthToken(async ({ token }) => {
  const authorized = token?.type === NamesClients.PASSWORD;
  return { props: { authorized } };
});
