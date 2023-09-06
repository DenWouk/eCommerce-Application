import { NextApiRequest, NextApiResponse } from 'next';
import { BaseAddress } from '@commercetools/platform-sdk';
import customerModel from '@/src/helpers/commercetools/customer';
import { countryPost } from '@/src/enums/countries';
import { IBaseAddressProfile } from '@/src/interfaces/IBaseAddressProfile';

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
      const {
        email,
        version,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
        shippingAddress,
        billingAddress,
      } = body;
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

      const newShippingAddresses: IBaseAddressProfile[] = [];
      const newBillingAddresses: IBaseAddressProfile[] = [];

      if (addresses && addresses.length) {
        const addressActions = addresses.map((address: IBaseAddressProfile) => {
          const countryPostFind = countryPost.find(
            (countryAddress) => countryAddress.label === address.country || countryAddress.code === address.country
          );

          if (countryPostFind) {
            console.log(address.shippingAddress, 'shippingAddress');

            if (address.shippingAddress) {
              if (address.id) {
                actions.push({
                  action: 'addShippingAddressId',
                  addressId: shippingAddress,
                });
              } else {
                newShippingAddresses.push(address)
              }
            }

            if (address.billingAddress) {
              if (address.id) {
                actions.push({
                  action: 'addBillingAddressId',
                  addressId: billingAddress.id,
                });
              } else {
                newBillingAddresses.push(address)
              }
            }
            // if (!shippingAddress) {
            //   actions.push({
            //     action: 'removeShippingAddressId',
            //     addressId: shippingAddress.id,
            //   });
            // }
            // if (!billingAddress) {
            //   actions.push({
            //     action: 'removeBillingAddressId',
            //     addressId: billingAddress.id,
            //   });
            // }
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

      const customerApi = await customerModel.updateMe(req, {
        version,
        actions,
      });
      // if (newShippingAddresses.length) {
      //   newShippingAddresses.map((address) => {
      //     console.log(customerApi, v, 'customerApi');
      //     return v;
      //   });
      // }
      // if (newBillingAddresses.length) {
      //   newShippingAddresses.map((v) => {
      //     console.log(customerApi, v, 'customerApi');
      //     return v;
      //   });
      // }
      // console.log(customerApi, 'customer=================');

      res.status(200).json(customerApi.body);
    } catch (err: unknown) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}
