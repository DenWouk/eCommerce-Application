import { NextApiRequest, NextApiResponse } from 'next';
import { BaseAddress } from '@commercetools/platform-sdk';
import customerModel from '@/src/helpers/commercetools/customer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const customerApi = await customerModel.getMe(req);

      res.status(200).json(customerApi.body);
    } catch (err: unknown) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
  if (req.method === 'POST') {
    const { body } = req;

    try {
      const { email, version, firstName, lastName, dateOfBirth, addressess } = body;

      let actions = [];
      if (email) {
        actions.push({
          action: 'changeEmail',
          email,
        });
      }
      if (firstName) {
        actions.push({
          action: 'setFirstName',
          firstName,
        });
      }
      if (lastName) {
        actions.push({
          action: 'setLastName',
          lastName,
        });
      }
      if (dateOfBirth) {
        actions.push({
          action: 'setDateOfBirth',
          dateOfBirth,
        });
      }
      if (addressess && addressess.length) {
        const addressActions = addressess.map((address: BaseAddress) => (address.id ? {
          action: 'changeAddress',
          addressId: '{{addressId}}',
          address: {
            streetName: address.streetName,
            streetNumber: address.streetNumber,
            postalCode: address.postalCode,
            city: address.city,
            country: address.country,
          },
        } : {
          action: 'addAddress',
          address: {
            streetName: address.streetName,
            streetNumber: address.streetNumber,
            postalCode: address.postalCode,
            city: address.city,
            country: address.country,
          },
        }));

        actions = [...actions, ...addressActions];
      }

      const customerApi = await customerModel.updateMe(req, {
        version,
        actions,
      });

      res.status(200).json(customerApi.body);
    } catch (err: unknown) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}
