import { Button, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import createCustomerDraft from '@/src/helpers/commercetools/customerDraft';
import signUp from '@/src/api/signUp';
import InputEmail from '../components/InputEmail';
import { IFormInput } from './interfaces/IFormInput';
import InputPassword from '../components/InputPassword';
import InputFirstName from '../components/InputFirstName';
import InputLastName from '../components/InputLastName';
import Address from '../components/Address';
import InputDate from '../components/InputDate';

function SignUpPage() {
  const form = useForm<IFormInput>({
    defaultValues: {
      email: 'zakalupali2@gmail.com',
      password: 'K33666655!',
      firstName: 'Kir',
      lastName: 'Yur',
      dateOfBirth: null,
      addresses: [
        {
          country: '',
          city: 'fdfs',
          streetName: 'fdfd',
          streetNumber: '5',
          postalCode: '12345',
          shippingAddress: true,
        },
      ],
      // defaultShippingAddress: '0',
      // defaultBillingAddress: '0',
    },
  });

  const {
    register,
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    const customerDraft = createCustomerDraft(data);
    // const customer = await signUp(customerDraft);
    console.log(customerDraft);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} className="m-10" width={400}>
          <Typography variant="h4" className="m-10">
            Register
          </Typography>
          <InputEmail register={register} errors={errors} name="email" />
          <InputPassword register={register} errors={errors} name="password" />
          <InputFirstName register={register} errors={errors} name="firstName" />
          <InputLastName register={register} errors={errors} name="lastName" />
          <InputDate register={register} control={control} errors={errors} name="dateOfBirth" />
          <Address
            setValue={setValue}
            getValues={getValues}
            register={register}
            control={control}
            errors={errors}
            name="addresses"
            watch={watch}
          />
          <Button variant="outlined" type="submit">
            Sign up
          </Button>
          <Typography variant="caption">
            Already have an account?
            <Button component={Link} variant="outlined" href="/sign-in">
              Log in
            </Button>
          </Typography>
        </Stack>
      </form>
    </FormProvider>
  );
}
export default SignUpPage;
