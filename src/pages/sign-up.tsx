import { Button, Stack, Typography } from '@mui/material';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import signUp from '@/src/api/signUp';
import createCustomerDraft from '@/src/helpers/commercetools/customerDraft';
import ErrorMessage from '@/src/components/ErrorMessage';
import NamesClients from '@/src/helpers/commercetools/consts';
import { IFormInput } from '@/src/interfaces/IFormInput';
import InputEmail from '../components/InputEmail';
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
  const showError = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
    });
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const { email, password } = data;
    try {
      const customerDraft = createCustomerDraft(data);
      await signUp(customerDraft);
      const result = await signIn(NamesClients.PASSWORD, {
        username: email,
        password,
        redirect: false,
      });
      console.log(customerDraft, 'hello');
      clearErrors('root');
      if (result?.ok) {
        router.push(`/`);
        showSuccess();
      }
    } catch (e: any) {
      if (e instanceof Error) {
        setError('root.server', {
          type: 'manual',
          message: e.message,
        } as FieldError);
        showError(e.message);
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
            watch={watch}
          />
          {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}
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
