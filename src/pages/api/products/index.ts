import { NextApiRequest, NextApiResponse } from 'next';
import productModel from '@/src/helpers/commercetools/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const searchString = Array.isArray(req.query?.search) ? req.query.search[0] : req.query.search;
    await productModel
      .getProducts(req, searchString)
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
