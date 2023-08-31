import { Box, Button, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import HomeIcon from '@mui/icons-material/Home';
import getProfile from '../api/getProfile';
import { countryPost } from '../enums/countries';
import AddressAccordions from '../components/AddressAccordions';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';
import UserInfoForm from '../components/UserInfoForm';

export default function ProfilePage() {
  const customerData = {
    id: '',
    dateOfBirth: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    addresses: [],
    shippingAddressIds: [],
    billingAddressIds: [],
    isEmailVerified: false,
    stores: [],
    version: 1,
  };

  const [profileInfo, setProfileInfo] = useState(customerData);
  const [billingAddresses, setBillingAddresses] = useState([] as IBaseAddressProfile[]);
  const [shippingAddresses, setShippingAddresses] = useState([] as IBaseAddressProfile[]);

  const { data: session } = useSession();

  useEffect(() => {
    getProfile()
      .then((data) => {
        const {
          addresses,
          shippingAddressIds,
          billingAddressIds,
          defaultShippingAddressId,
          defaultBillingAddressId,
        } = data;

        const billingAddressesArr: IBaseAddressProfile[] = billingAddressIds
          .map((addressId: string) => {
            const addressFind = addresses.find(
              (address: IBaseAddressProfile) => address.id === addressId
            );
            const isDefault = addressFind.id === defaultBillingAddressId;
            const code = addressFind.country;
            const countryObj = countryPost.find((country) => country.code === code);

            addressFind.countryLabel = countryObj!.label;
            addressFind.isDefault = Number(isDefault);
            return addressFind;
          })
          .sort(
            (a1: IBaseAddressProfile, a2: IBaseAddressProfile) =>
              (a2.isDefault as number) - (a1.isDefault as number)
          );

        const shippingAddressesArr: IBaseAddressProfile[] = shippingAddressIds
          .map((addressId: string) => {
            const addressFind = addresses.find(
              (address: IBaseAddressProfile) => address.id === addressId
            );
            const isDefault = addressFind.id === defaultShippingAddressId;
            const code = addressFind.country;
            const countryObj = countryPost.find((country) => country.code === code);

            addressFind.countryLabel = countryObj!.label;
            addressFind.isDefault = Number(isDefault);
            return addressFind;
          })
          .sort(
            (a1: IBaseAddressProfile, a2: IBaseAddressProfile) =>
              (a2.isDefault as number) - (a1.isDefault as number)
          );

        setProfileInfo(data);
        setShippingAddresses(shippingAddressesArr);
        setBillingAddresses(billingAddressesArr);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const { firstName, lastName, dateOfBirth, email, version } = profileInfo;

  return (
    <Box>
      <Typography
        align="center"
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: 1.2,
          textAlign: 'center',
          color: '#6195c3',
        }}
      >
        Hello, {session && session!.user!.name}! Welcome to your profile!
      </Typography>

      <Stack spacing={1}>
        <Typography>First Name: {firstName}</Typography>
        <Typography>Last Name: {lastName} </Typography>
        <Typography>Date of Birth: {dateOfBirth}</Typography>
        <Button
          endIcon={<HomeIcon />}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: 1.2,
            textAlign: 'center',
            color: '#6195c3',
          }}
        >
          User Addresses
        </Button>
        <AddressAccordions shippingAddress={shippingAddresses} billingAddress={billingAddresses} />
        {firstName && (
          <UserInfoForm
            firstName={firstName}
            lastName={lastName}
            dateOfBirth={dateOfBirth}
            emailProp={email}
            version={version}
          />
        )}
      </Stack>
    </Box>
  );
}
