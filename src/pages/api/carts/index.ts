import { NextApiRequest, NextApiResponse } from 'next';
import { CartDraft } from '@commercetools/platform-sdk';
import { handlerAuthToken } from '@/src/helpers/next/withAuthToken';
import cartModel from '@/src/helpers/commercetools/cart';
import { UpdateCartWithTypeAction } from '@/src/types/commercetools';

export default handlerAuthToken(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await cartModel
      .getCart(req)
      .then((cartsResponse) => {
        res.status(200).json(cartsResponse.body);
      })
      .catch(() => {
        res.status(400).json({ message: 'Oops, something went wrong, try again later' });
      });
  }

  if (req.method === 'POST') {
    const body = req.body as CartDraft | null;
    await cartModel
      .createCart(req, body)
      .then((cartsResponse) => {
        res.status(200).json(cartsResponse.body);
      })
      .catch(() => {
        res.status(400).json({ message: 'Oops, something went wrong, try again later' });
      });
  }

  if (req.method === 'PATCH') {
    const body = req.body as UpdateCartWithTypeAction;
    await cartModel
      .updateCart(req, body)
      .then((cartsResponse) => {
        res.status(200).json(cartsResponse.body);
      })
      .catch(() => {
        res.status(400).json({ message: 'Oops, something went wrong, try again later' });
      });
  }
});
