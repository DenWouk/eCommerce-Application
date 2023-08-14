import { NextApiRequest, NextApiResponse } from 'next';
import { CustomerDraft } from '@commercetools/platform-sdk';
import tokenCache from '@/src/helpers/commercetools/tokenCache';
import { TOKEN_KYE } from '@/src/constats';
import CustomerModel from '@/src/models/cutomer';
import createValueCookieToken from '@/src/helpers/commercetools/cookeis';

type NextApiRequestWithBody = Omit<NextApiRequest, 'body'> & {
  body: CustomerDraft;
};

export default async function handler(req: NextApiRequestWithBody, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;
    const customerModel = new CustomerModel();
    try {
      await customerModel.signUp(body);
      const responseSingIn = await customerModel.signIn({
        email: body.email,
        password: body.password!,
      });
      const { token, expirationTime } = tokenCache.get();
      const cookieValue = createValueCookieToken({ token, expirationTime });
      res
        .setHeader(TOKEN_KYE, tokenCache.get().token)
        .setHeader('Set-Cookie', cookieValue)
        .status(200)
        .json(responseSingIn);
    } catch (e: any) {
      const code = e?.body?.errors?.[0]?.code;
      if (code === 'DuplicateField' || code === 'invalid_customer_account_credentials') {
        res.status(400).json({ message: e.message });
      } else {
        res.status(400).json({ message: 'Oops, something went wrong, try again later' });
      }
    }
  }
}
