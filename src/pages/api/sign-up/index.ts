import { NextApiRequest, NextApiResponse } from 'next';
import { CustomerDraft } from '@commercetools/platform-sdk';
import customerModel from '@/src/helpers/commercetools/customer';

type NextApiRequestWithBody = Omit<NextApiRequest, 'body'> & {
  body: CustomerDraft;
};

export default async function handler(req: NextApiRequestWithBody, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;
    try {
      const responseSignUp = await customerModel.signUp(body);
      res.status(200).json(responseSignUp);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
