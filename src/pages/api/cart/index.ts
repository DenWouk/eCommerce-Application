import { NextApiRequest, NextApiResponse } from 'next';
import productModel from '@/src/helpers/commercetools/product';
import { handlerAuthToken } from '@/src/helpers/next/withAuthToken';

export default handlerAuthToken(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      await productModel
        .getProducts(req, req.query)
        .then((products) => {
          res.status(200).json(products);
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
);
