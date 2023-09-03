import { NextApiRequest, NextApiResponse } from 'next';
import { CustomerDraft } from '@commercetools/platform-sdk';
import CustomerModel from '@/src/models/cutomer';

type NextApiRequestWithBody = Omit<NextApiRequest, 'body'> & {
  body: CustomerDraft;
};

export default async function handler(req: NextApiRequestWithBody, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;
    const customerModel = new CustomerModel();
    try {
      const responseSignUp = await customerModel.signUp(body);
      console.log(responseSignUp, "send req");
      
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
