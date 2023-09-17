import { Paper, Stack, Typography, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import PasswordIcon from '@mui/icons-material/Password';
import { GetServerSideProps } from 'next';
import { Cart, Customer } from '@commercetools/platform-sdk';
import customerModel from '@/src/helpers/commercetools/customer';
import cartModel from '@/src/helpers/commercetools/cart';
import AddressAccordions from '../components/AddressAccordions';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';
import UserInfoForm from '../components/UserInfoForm';
import prepareAddresses from '../helpers/profile';
import AddressForm from '../components/AddressForm';
import UserInfoPassForm from '../components/UserInfoPassForm';
import isAuthorized from '../helpers/auth';
import { AuthProps } from '../types/auth';

type Props = {
  customer: Customer;
};

export default function ProfilePage({ customer }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [profileInfo, setProfileInfo] = useState(customer);

  const {
    addresses = [],
    shippingAddressIds = [],
    billingAddressIds = [],
    defaultShippingAddressId = '',
    defaultBillingAddressId = '',
  } = profileInfo;

  const billingAddresses: IBaseAddressProfile[] = prepareAddresses(
    billingAddressIds,
    addresses,
    defaultBillingAddressId
  );

  const shippingAddresses: IBaseAddressProfile[] = prepareAddresses(
    shippingAddressIds,
    addresses,
    defaultShippingAddressId
  );

  const { firstName, lastName, dateOfBirth, email, version, password } = profileInfo;

  const handleChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Paper elevation={4}>
      <Tabs value={tabIndex} aria-label="profile" onChange={(_, index) => handleChange(index)}>
        <Tab label="User Info" icon={<PersonPinIcon />} iconPosition="start" />
        <Tab label="Address" icon={<HomeIcon />} iconPosition="start" />
        <Tab label="Password" icon={<PasswordIcon />} iconPosition="start" />
      </Tabs>
      <Typography
        align="center"
        variant="h2"
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: 1.2,
          textAlign: 'center',
          color: '#6195c3',
          textTransform: 'uppercase',
          margin: '15px 15px',
        }}
      >
        Hello, {firstName}! Welcome to your profile!
      </Typography>
      <Stack spacing={1}>
        <Box
          sx={{
            paddingLeft: '25px',
          }}
        >
          <Typography>
            <strong>First Name:</strong> {firstName}{' '}
          </Typography>
          <Typography>
            <strong>Last Name:</strong> {lastName}{' '}
          </Typography>
          <Typography>
            <strong>Date of Birth:</strong> {dateOfBirth}{' '}
          </Typography>
        </Box>

        {tabIndex === 0 && firstName && (
          <>
            <UserInfoForm
              firstName={firstName}
              lastName={lastName || ''}
              dateOfBirth={dateOfBirth || ''}
              emailProp={email}
              version={version}
              onUpdate={setProfileInfo}
            />
            <AddressAccordions
              shippingAddress={shippingAddresses}
              billingAddress={billingAddresses}
            />
          </>
        )}
        {tabIndex === 1 && addresses && addresses.length && (
          <AddressForm
            addresses={addresses}
            version={version}
            shippingAddressIds={profileInfo.shippingAddressIds as string[]}
            billingAddressIds={profileInfo.billingAddressIds as string[]}
            defaultShippingAddressId={profileInfo.defaultShippingAddressId as string}
            defaultBillingAddressId={profileInfo.defaultBillingAddressId as string}
            onUpdate={setProfileInfo}
          />
        )}
        {tabIndex === 2 && (
          <UserInfoPassForm
            password={password || ''}
            version={version}
            email={email}
            onUpdate={setProfileInfo}
          />
        )}
      </Stack>
    </Paper>
  );
}

export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });

  let cart: Cart | null;
  try {
    cart = (await cartModel.getCart(req)).body;
  } catch {
    cart = null;
  }

  try {
    const customerResponse = await customerModel.getMe(req);
    return { props: { authorized, cart, customer: customerResponse.body } };
  } catch {
    return {
      notFound: true,
    };
  }
};
