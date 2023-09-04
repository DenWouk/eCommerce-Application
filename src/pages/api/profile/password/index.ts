import { NextApiRequest, NextApiResponse } from 'next';
import customerModel from '@/src/helpers/commercetools/customer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { body } = req;

    try {
      const { password, version, passwordNew } = body;

      const customerApi = await customerModel.updatePasswordMe(req, {
        version,
        currentPassword: password,
        newPassword: passwordNew
      });

      res.status(200).json(customerApi.body);
    } catch (err: unknown) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}
