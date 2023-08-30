import { Box, Paper, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
// import customerModel from '../helpers/commercetools/customer';
import { useSession } from 'next-auth/react';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import getProfile from '../api/getProfile';
import { countryPost } from '../enums/countries';
import AddressAccordions from '../components/AddressAccordions';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';
import ProfileTabs from '../components/ProfileTabs';
import InputFirstName from '../components/InputFirstName';
import { IFormInput } from '../interfaces/IFormInput';
import signUp from './sign-up';
import createCustomerDraft from '../helpers/commercetools/customerDraft';
import NamesClients from '../helpers/commercetools/consts';

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


  //       const form = useForm<IFormInput>({
  //         mode: 'onChange',
  //         defaultValues: {
  //           email: '',
  //           password: '',
  //           firstName: '',
  //           lastName: '',
  //           dateOfBirth: null,
  //           addresses: [
  //             {
  //               country: '',
  //               city: '',
  //               streetName: '',
  //               streetNumber: '',
  //               postalCode: '',
  //               shippingAddress: true,
  //               billingAddress: false,
  //               defaultShippingAddress: false,
  //               defaultBillingAddress: false,
  //             },
  //           ],
  //         },
  //       });
  //       const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
  //         const { email, password } = data;
  //         try {
  //           const customerDraft = createCustomerDraft(data);
  //           signUp(customerDraft);
  //           const result = await signIn(NamesClients.PASSWORD, {
  //             username: email,
  //             password,
  //             redirect: false,
  //           });
  //           clearErrors('root');
  //           if (result?.ok) {
  //             router.replace('/');
  //             showSuccess('Successful Registration!');
  //           }
  //         } catch (e: unknown) {
  //           if (e instanceof Error) {
  //             setError('root.server', {
  //               type: 'manual',
  //               message: e.message,
  //             } as FieldError);
  //           }
  //         }
  //       };
  //       const {
  //         register,
  //         setError,
  //         clearErrors,
  //         control,
  //         watch,
  //         getValues,
  //         setValue,
  //         handleSubmit,
  //         formState: { errors, isSubmitting },
  //       } = form;

  //       console.log({
  //         addresses,
  //         shippingAddressIds,
  //         billingAddressIds,
  //         data,
  //         billingAddressesArr,
  //         shippingAddressesArr,
  //         defaultShippingAddressId,
  //         defaultBillingAddressId,
  //       });

        setProfileInfo(data);
        setShippingAddresses(shippingAddressesArr);
        setBillingAddresses(billingAddressesArr);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const { firstName, lastName, dateOfBirth } = profileInfo;

  return (
    <Box>
      <Paper component="div" className="p-5" elevation={3}>
        <Typography align="center" className="m-5">
          Hello, <strong>{session ? session!.user!.name : 'User'}</strong>! Welcome to your profile!
        </Typography>

        <Stack spacing={1}>
          {/* <FormProvider {...form}>
            <form className="form-registration" onSubmit={handleSubmit(onSubmit)} noValidate> */}
              {/* <InputFirstName register={register} errors={errors} name="firstName" /> */}
              <Typography>First Name: {firstName}</Typography>
              <Typography>Last Name: {lastName} </Typography>
              <Typography>Date of Birth: {dateOfBirth}</Typography>
              <Typography className="text-center">
                <strong>User Addresses:</strong>
              </Typography>
              <AddressAccordions
                shippingAddress={shippingAddresses}
                billingAddress={billingAddresses}
              />
            {/* </form>
          </FormProvider> */}
        </Stack>
      </Paper>
    </Box>
  );
}
export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });
  return { props: { authorized } };
};
