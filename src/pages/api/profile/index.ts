import { NextApiRequest, NextApiResponse } from 'next';
// import customerModel from '@/src/helpers/commercetools/customer';

const customer = {
  id: 'ca6a4015-d0f5-49ed-9511-8123d767b9a3',
  version: 1,
  versionModifiedAt: '2023-08-30T09:02:46.095Z',
  lastMessageSequenceNumber: 1,
  createdAt: '2023-08-30T09:02:46.095Z',
  lastModifiedAt: '2023-08-30T09:02:46.095Z',
  lastModifiedBy: {
    clientId: 'uOBOGxcoFlUh1-x4Wta7Ould',
    isPlatformClient: false,
  },
  createdBy: {
    clientId: 'uOBOGxcoFlUh1-x4Wta7Ould',
    isPlatformClient: false,
  },
  email: 'tetlisn@gmail.com',
  firstName: 'Tet',
  lastName: 'Lisna',
  dateOfBirth: '2000-11-11',
  password: '****z08=',
  addresses: [
    {
      id: 'r2VDE0pD',
      firstName: 'Tet',
      lastName: 'Lisna',
      streetName: 'Lololol',
      streetNumber: '45',
      postalCode: 'A1A 1A1',
      city: 'Montreal',
      country: 'CA',
      email: 'tetlisn@gmail.com',
    },
    {
      id: 'lkrUCIdA',
      firstName: 'Tet',
      lastName: 'Lisna',
      streetName: 'Lolo',
      streetNumber: '112',
      postalCode: '12345',
      city: 'Sant Francisco',
      country: 'US',
      email: 'tetlisn@gmail.com',
    },
    {
      id: 'm-l1EEAn',
      firstName: 'Tet',
      lastName: 'Lisna',
      streetName: 'hutre',
      streetNumber: '21',
      postalCode: '12312',
      city: 'Grunberg',
      country: 'DE',
      email: 'tetlisn@gmail.com',
    },
  ],
  defaultShippingAddressId: 'm-l1EEAn',
  defaultBillingAddressId: 'lkrUCIdA',
  shippingAddressIds: ['m-l1EEAn', 'r2VDE0pD'],
  billingAddressIds: ['lkrUCIdA', 'r2VDE0pD'],
  isEmailVerified: false,
  stores: [],
  authenticationMode: 'Password',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      //  const customerApi = await customerModel.getMe(req);
      //   console.log({ customerApi });
      res.status(200).json(customer);
    } catch (err: unknown) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}
