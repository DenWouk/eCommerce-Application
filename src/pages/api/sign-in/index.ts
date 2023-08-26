import { NextApiRequest, NextApiResponse } from 'next';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import CustomerModel from '@/src/models/cutomer';

type NextApiRequestWithBody = Omit<NextApiRequest, 'body'> & {
  body: UserAuthOptions;
};

export default async function handler(req: NextApiRequestWithBody, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;
    new CustomerModel()
      .signIn({ email: body.username, password: body.password })
      .then((me) => {
        res.status(200).json(me);
      })
      .catch((e) => {
        const code = e?.body?.errors?.[0]?.code;
        if (code === 'InvalidCredentials' || code === 'invalid_customer_account_credentials') {
          res.status(400).json({ message: e.message });
        } else {
          res.status(400).json({ message: 'Oops, something went wrong, try again later' });
        }
      });
  }
}
