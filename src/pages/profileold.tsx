// import { Box, Paper, Stack, Typography } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import getProfile from '../api/getProfile';
// import { countryPost } from '../enums/countries';
// import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';

// export default function ProfilePage() {
//   const customerData = {
//     id: '',
//     dateOfBirth: '',
//     email: '',
//     firstName: '',
//     lastName: '',
//     password: '',
//     addresses: [],
//     shippingAddressIds: [],
//     billingAddressIds: [],
//     isEmailVerified: false,
//     stores: [],
//   };

//   const [profileInfo, setProfileInfo] = useState(customerData);
//   const [billingAddresses, setBillingAddresses] = useState([] as IBaseAddressProfile[]);
//   const [shippingAddresses, setShippingAddresses] = useState([] as IBaseAddressProfile[]);

//   const { data: session } = useSession();

//   useEffect(() => {
//     getProfile()
//       .then((data) => {
//         const {
//           addresses,
//           shippingAddressIds,
//           billingAddressIds,
//           defaultShippingAddressId,
//           defaultBillingAddressId,
//         } = data;

//         console.log({ data });

//         const billingAddressesArr: IBaseAddressProfile[] = billingAddressIds
//           .map((addressId: string) => {
//             const addressFind = addresses.find(
//               (address: IBaseAddressProfile) => address.id === addressId
//             );
//             const isDefault = addressFind.id === defaultBillingAddressId;
//             const code = addressFind.country;
//             const countryObj = countryPost.find((country) => country.code === code);

//             addressFind.countryLabel = countryObj!.label;
//             addressFind.isDefault = Number(isDefault);
//             return addressFind;
//           })
//           .sort(
//             (a1: IBaseAddressProfile, a2: IBaseAddressProfile) =>
//               (a2.isDefault as number) - (a1.isDefault as number)
//           );

//         const shippingAddressesArr: IBaseAddressProfile[] = shippingAddressIds
//           .map((addressId: string) => {
//             const addressFind = addresses.find(
//               (address: IBaseAddressProfile) => address.id === addressId
//             );
//             const isDefault = addressFind.id === defaultShippingAddressId;
//             const code = addressFind.country;
//             const countryObj = countryPost.find((country) => country.code === code);

//             addressFind.countryLabel = countryObj!.label;
//             addressFind.isDefault = Number(isDefault);
//             return addressFind;
//           })
//           .sort(
//             (a1: IBaseAddressProfile, a2: IBaseAddressProfile) =>
//               (a2.isDefault as number) - (a1.isDefault as number)
//           );

//         setProfileInfo(data);
//         setShippingAddresses(shippingAddressesArr);
//         setBillingAddresses(billingAddressesArr);
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }, []);

//   const { firstName, lastName, dateOfBirth } = profileInfo;

//   return (
//     <Box>
//       <Paper component="div" className="p-5" elevation={3}>
//         <Typography align="center" className="m-5">
//           Hello, <strong>{session ? session!.user!.name : 'User'}</strong>! Welcome to your profile!
//         </Typography>
//         <Stack spacing={1}>
//           <Typography>First Name: {firstName}</Typography>
//           <Typography>Last Name: {lastName} </Typography>
//           <Typography>Date of Birth: {dateOfBirth}</Typography>
//           <Typography className="text-center">
//             <strong>User Addresses:</strong>
//           </Typography>
//           {/* <AddressAccordions
//             shippingAddress={shippingAddresses}
//             billingAddress={billingAddresses}
//           /> */}
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }
