import { Button, Stack, Typography } from '@mui/material';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signUp from '@/src/api/signUp';
import createCustomerDraft from '@/src/helpers/commercetools/customerDraft';
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
      addresses: [],
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
    setError,
    clearErrors,
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const router = useRouter();
  const showSuccess = () => {
    toast.success('Successful Registration!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
    });
  };
  const showError = () => {
    toast.error('There is already an existing customer with the provided email', {
      position: toast.POSITION.TOP_CENTER,
      // autoClose: 3000,
      hideProgressBar: true,
    });
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      const customerDraft = createCustomerDraft(data);
      const result = await signUp(customerDraft);
      clearErrors('root');
      if ((result && result.statusCode && result.statusCode === 200) || result.statusCode === 201) {
        router.push(`/`);
        showSuccess();
      }
    } catch (e: any) {
      if (e instanceof Error) {
        setError('root.server', {
          type: 'manual',
          message: e.message,
        } as FieldError);
        showError();
      }
    }
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
          watch={watch}/>
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
