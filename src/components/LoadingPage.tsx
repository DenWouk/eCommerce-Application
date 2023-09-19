import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';

export default function LoadingPage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const showLoader = (value: boolean) => () => setIsLoading(value);

    Router.events.on('routeChangeStart', showLoader(true));
    Router.events.on('routeChangeComplete', showLoader(false));
    Router.events.on('routeChangeError', showLoader(false));

    return () => {
      Router.events.off('routeChangeStart', showLoader);
      Router.events.off('routeChangeComplete', showLoader(false));
      Router.events.off('routeChangeError', showLoader(false));
    };
  }, []);

  return (
    isLoading && (
      <LinearProgress
        sx={{ position: 'absolute', left: 0, width: '100%', height: '7px', borderTop: 'solid 1px #fefefe' }}
        color="info"
      />
    )
  );
}
