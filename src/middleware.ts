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
    if (pathname === 'profile' && type !== NamesClients.PASSWORD) {
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true; // If there is a token, the user is authenticated
      },
    },
  }
);

export const config = { matcher: ['/profile', '/sign-in', '/sign-up'] };
