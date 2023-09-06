import { NextApiRequest, NextApiResponse } from 'next';
import { BaseAddress, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
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
        version,
        email,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
      } = body;

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
            if (address.shippingAddress) {
              if (address.id) {
                actions.push({
                  action: 'addShippingAddressId',
                  addressId: address.id,
                });
              } else {
                newShippingAddresses.push(address)
              }
            }

            if (address.billingAddress) {
              if (address.id) {
                actions.push({
                  action: 'addBillingAddressId',
                  addressId: address.id,
                });
              } else {
                newBillingAddresses.push(address)
              }
            }
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

      let customerApi = await customerModel.updateMe(req, {
        version,
        actions,
      });

      if (newShippingAddresses.length || newBillingAddresses.length) {
          const newBillingShippingActions: MyCustomerUpdateAction[] = [];

          if(newShippingAddresses.length){
            newShippingAddresses.forEach((address: BaseAddress) => {
              const newAddressFind = customerApi.body.addresses.find((newAddress)=>(
                address.city === newAddress.city &&
                address.streetName === newAddress.streetName &&
                address.streetNumber === newAddress.streetNumber &&
                address.postalCode === newAddress.postalCode
                ));

                if(newAddressFind)
                  newBillingShippingActions.push({
                    action: 'addShippingAddressId',
                    addressId: newAddressFind.id,
                  });
              });
          }
    
      if (newBillingAddresses.length) {
        newBillingAddresses.forEach((address: BaseAddress) => {
          const newAddressFind = customerApi.body.addresses.find((newAddress)=>(
            // address.country === newAddress.country &&
            address.city === newAddress.city &&
            address.streetName === newAddress.streetName &&
            address.streetNumber === newAddress.streetNumber &&
            address.postalCode === newAddress.postalCode
            ));
            if(newAddressFind)
            newBillingShippingActions.push({
              action: 'addBillingAddressId',
              addressId: newAddressFind.id,
            });
        });
      }
      if (newBillingShippingActions.length) {
        customerApi = await customerModel.updateMe(req, {
          version: customerApi.body.version,
          actions: newBillingShippingActions,
        });
      }
    }
      res.status(200).json(customerApi.body);
    } catch (err: unknown) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}
