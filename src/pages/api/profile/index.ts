import { NextApiRequest, NextApiResponse } from 'next';
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
      const { email, version, firstName, lastName, dateOfBirth} = body;
      // const {addressId, address:[streetName,streetNumber, postalCode,
      //   city,
      //   country]} = bodyAddress; 
      const customerApi = await customerModel.updateMe(req, {
        version,
        actions: [
          {
            action: 'changeEmail',
            email,
          },
          {
            action: 'setFirstName',
            firstName,
          },
          {
            action: 'setLastName',
            lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
          // {
          //   action: 'changeAddress',
          //   addressId: '{{addressId}}',
          //   address: {
          //     streetName,
          //     streetNumber,
          //     postalCode,
          //     city,
          //     country,
          //   },
          // },
          // {
          //   action: 'setDefaultBillingAddress',
          //   addressId: '{{addressId}}',
          // },
          // {
          //   "action": "addBillingAddressId",
          //   "addressId": "{{addressId}}"
          // }
         
        ],
      });
      res.status(200).json(customerApi.body);
    } catch (err: unknown) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}
