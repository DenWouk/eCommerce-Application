// import { Tabs, Tab } from '@mui/material';
// import { useState } from 'react';
// import UserInfoForm from './UserInfoForm';

// export default function ProfileTabs() {
//   const [tabIndex, setTabIndex] = useState(0);
 
//   const handleChange = (e) => {
//     setTabIndex(e.target);
//     console.log(e.target, 'target');
//   }
//   return (
//     // value={value} onChange={handleChange}
//     <div>
//     <Tabs value={tabIndex} aria-label="profile" onChange={handleChange}>
//       <Tab label="User Info"/>
//       <Tab label="Address" />
//       <Tab label="Password" />
//     </Tabs>
//      {tabIndex === 0 && <UserInfoForm />}
//      {tabIndex === 1 && <AddressForm />}
//      {tabIndex === 2 && <PasswordForm />}
//      </div>
//   );
// }
