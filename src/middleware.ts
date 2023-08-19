import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import NamesClients from '@/src/helpers/commercetools/consts';
import tokenCache from '@/src/helpers/commercetools/tokenCache';

export default withAuth((req) => {
  const { type, token } = req.nextauth.token || {};
  token && tokenCache.set(token);
  console.log(tokenCache.get(), 111);
  const url = req.nextUrl.clone();
  const { pathname } = url;
  if (pathname === '/login' && type === NamesClients.PASSWORD) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  if (pathname === 'profile' && type !== NamesClients.PASSWORD) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

// export const config = { matcher: ['/profile', '/login'] };
