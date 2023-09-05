import { NextApiRequest, NextApiResponse } from 'next';
import { BaseAddress } from '@commercetools/platform-sdk';
import customerModel from '@/src/helpers/commercetools/customer';
import { countryPost } from '@/src/enums/countries';

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
      const { email, version, firstName, lastName, dateOfBirth, addresses } = body;
      console.log({ body });

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
      console.log({ addresses });

      if (addresses && addresses.length) {
        const addressActions = addresses.map((address: BaseAddress) => {
          const countryPostFind = countryPost.find(
            (countryAddress) => countryAddress.label === address.country
          );
          if (countryPostFind) {
            return address.id
              ? {
                  action: 'changeAddress',
                  addressId: address.id,
                  address: {
                    streetName: address.streetName,
                    streetNumber: address.streetNumber,
                    postalCode: address.postalCode,
                    city: address.city,
                    country: countryPostFind.code,
                  },
                }
              : {
                  action: 'addAddress',
                  address: {
                    streetName: address.streetName,
                    streetNumber: address.streetNumber,
                    postalCode: address.postalCode,
                    city: address.city,
                    country: countryPostFind.code,
                  },
                };
          }
          return false;
        });

        addressActions.filter((address: BaseAddress) => address);

        actions = [...actions, ...addressActions];
      }

      console.log(actions);

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
