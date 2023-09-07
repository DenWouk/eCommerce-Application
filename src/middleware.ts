import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import NamesClients from '@/src/helpers/commercetools/consts';

export default withAuth(
  (req) => {
    const { type } = req.nextauth.token || {};
    const url = req.nextUrl.clone();
    const { pathname } = url;
    if (pathname === '/sign-in' && type === NamesClients.PASSWORD) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    if (pathname === '/sign-up' && type === NamesClients.PASSWORD) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const path = req.nextUrl.pathname;
        if (path === '/profile') {
          return token?.type === NamesClients.PASSWORD;
        }
        return path === '/sign-in' || path === '/sign-up';
      },
    },
  }
);

export const config = { matcher: ['/profile', '/sign-in', '/sign-up'] };
