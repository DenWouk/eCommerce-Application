import { Button, Stack, Typography, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import HomeIcon from '@mui/icons-material/Home';
import getProfile from '../api/getProfile';
import AddressAccordions from '../components/AddressAccordions';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';
import UserInfoForm from '../components/UserInfoForm';
import prepareAddresses from '../helpers/profile';
import AddressForm from '../components/AddressForm';
import UserInfoPassForm from '../components/UserInfoPassForm';

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
    version: 0,
  };

  const [profileInfo, setProfileInfo] = useState(customerData);
  const [allAddresses, setAllAddresses] = useState([] as IBaseAddressProfile[]);
  const [billingAddresses, setBillingAddresses] = useState([] as IBaseAddressProfile[]);
  const [shippingAddresses, setShippingAddresses] = useState([] as IBaseAddressProfile[]);
  const [passwordInfo, setPassword] = useState(customerData);
  const [tabIndex, setTabIndex] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    getProfile()
      .then((data) => {
        setPassword(data)
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

 
  const handleChange = (index:number) => {
    setTabIndex(index);
  }

  return (
     <div>
    <Tabs value={tabIndex} aria-label="profile" onChange={(_,index)=>handleChange(index)}>
      <Tab label="User Info" />
      <Tab label="Address" />
      <Tab label="Password" />
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
        }}
      >
        Hello, {session && session!.user!.name}! Welcome to your profile!
      </Typography> 
      <Stack spacing={1}>
        <Typography>First Name: {firstName}</Typography>
        <Typography>Last Name: {lastName} </Typography>
        <Typography>Date of Birth: {dateOfBirth}</Typography>
       
     {tabIndex === 0 && (firstName && 
     
     <><UserInfoForm
            firstName={firstName}
            lastName={lastName}
            dateOfBirth={dateOfBirth}
            emailProp={email}
            version={version} /><AddressAccordions shippingAddress={shippingAddresses} billingAddress={billingAddresses} /></> 
      )}
        
     {tabIndex === 1 && (allAddresses && allAddresses.length &&  <>
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
        <AddressForm addresses={allAddresses} version={0}/>
        </>)}
     {tabIndex === 2 && <UserInfoPassForm password={password} version={0} />}

      
        {/* {allAddresses && allAddresses.length && (
          <AddressForm addresses={allAddresses} version={0} />
        )} */}
        {/* <AddressAccordions shippingAddress={shippingAddresses} billingAddress={billingAddresses} /> */}
        {/* {firstName && (
          <UserInfoForm
            firstName={firstName}
            lastName={lastName}
            dateOfBirth={dateOfBirth}
            emailProp={email}
            version={version}
          />
        )} */}
        {/* <UserInfoPassForm password={password} version={0} /> */}
      </Stack>
    {/* </Box> */}
    </div>
  );
}
