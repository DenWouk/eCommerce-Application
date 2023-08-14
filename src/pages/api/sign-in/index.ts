import { NextApiRequest, NextApiResponse } from 'next';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import tokenCache from '@/src/helpers/commercetools/tokenCache';
import { TOKEN_KYE } from '@/src/constats';
import CustomerModel from '@/src/models/cutomer';
import createValueCookieToken from '@/src/helpers/commercetools/cookeis';

type NextApiRequestWithBody = Omit<NextApiRequest, 'body'> & {
  body: UserAuthOptions;
};

export default async function handler(req: NextApiRequestWithBody, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;
    new CustomerModel()
      .signIn({ email: body.username, password: body.password })
      .then((me) => {
        const { token, expirationTime } = tokenCache.get();
        const cookieValue = createValueCookieToken({ token, expirationTime });
        res
          .setHeader(TOKEN_KYE, tokenCache.get().token)
          .setHeader('Set-Cookie', cookieValue)
          .status(200)
          .json(me);
      })
      .catch((e) => {
        const code = e?.body?.errors?.[0]?.code;
        if (code === 'invalid_customer_account_credentials') {
          res.status(400).json({ message: e.message });
        } else {
          res.status(400).json({ message: 'Oops, something went wrong, try again later' });
        }
      });
  }
}
