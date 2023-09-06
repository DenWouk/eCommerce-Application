import { Paper, Stack, Typography, Tabs, Tab, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import PasswordIcon from '@mui/icons-material/Password';
import { GetServerSideProps } from 'next';
import { Customer } from '@commercetools/platform-sdk';
import getProfile from '../api/getProfile';
import AddressAccordions from '../components/AddressAccordions';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';
import UserInfoForm from '../components/UserInfoForm';
import prepareAddresses from '../helpers/profile';
import AddressForm from '../components/AddressForm';
import UserInfoPassForm from '../components/UserInfoPassForm';
import isAuthorized from '../helpers/auth';
import { AuthProps } from '../types/auth';

export default function ProfilePage() {
  const customerData: Partial<Customer> = {
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
    version: 0,
  };

  const [profileInfo, setProfileInfo] = useState(customerData);
  const [allAddresses, setAllAddresses] = useState([] as IBaseAddressProfile[]);
  const [billingAddresses, setBillingAddresses] = useState([] as IBaseAddressProfile[]);
  const [shippingAddresses, setShippingAddresses] = useState([] as IBaseAddressProfile[]);
  const [passwordInfo, setPassword] = useState(customerData);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setPassword(data);
        setProfileInfo(data);

        const {
          addresses,
          shippingAddressIds,
          billingAddressIds,
          defaultShippingAddressId,
          defaultBillingAddressId,
        } = data;
        setAllAddresses([...addresses]);

        const billingAddressesArr: IBaseAddressProfile[] = prepareAddresses(
          billingAddressIds,
          addresses,
          defaultBillingAddressId
        );

        const shippingAddressesArr: IBaseAddressProfile[] = prepareAddresses(
          shippingAddressIds,
          addresses,
          defaultShippingAddressId
        );

        setShippingAddresses(shippingAddressesArr);
        setBillingAddresses(billingAddressesArr);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const { firstName, lastName, dateOfBirth, email, version } = profileInfo;
  const { password } = passwordInfo;

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
              emailProp={email || ''}
              version={version || 0}
              onUpdate={(customer: Customer) => setProfileInfo(customer)}
            />
            <AddressAccordions
              shippingAddress={shippingAddresses}
              billingAddress={billingAddresses}
            />
          </>
        )}
        {tabIndex === 1 && allAddresses && allAddresses.length && (
          <AddressForm
            addresses={allAddresses}
            version={version || 0}
            shippingAddressIds={profileInfo.shippingAddressIds as string[]}
            billingAddressIds={profileInfo.billingAddressIds as string[]}
            defaultShippingAddressId={profileInfo.defaultShippingAddressId as string}
            defaultBillingAddressId={profileInfo.defaultBillingAddressId as string}
          />
        )}
        {tabIndex === 2 && (
          <UserInfoPassForm
            password={password || ''}
            version={version || 0}
            email={email || ''}
            onUpdate={(customer: Customer) => setProfileInfo(customer)}
          />
        )}
      </Stack>
    </Paper>
  );
}
export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });
  return { props: { authorized } };
};
