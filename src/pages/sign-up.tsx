import { Button, Stack, Typography } from '@mui/material';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import ErrorMessage from '@/src/components/ErrorMessage';
import NamesClients from '@/src/helpers/commercetools/consts';
import createCustomerDraft from '@/src/helpers/commercetools/customerDraft';
import LoadingButton from '@/src/components/LoadingButton';
import { AuthProps } from '@/src/types/auth';
import isAuthorized from '@/src/helpers/auth';
import signUp from '@/src/api/signUp';
import { showSuccess } from '@/src/helpers/toastify';
import InputEmail from '../components/InputEmail';
import { IFormInput } from '../interfaces/IFormInput';
import InputPassword from '../components/InputPassword';
import InputFirstName from '../components/InputFirstName';
import InputLastName from '../components/InputLastName';
import Address from '../components/Address';
import InputDate from '../components/InputDate';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      addresses: [
        {
          country: 'United States',
          city: '',
          streetName: '',
          streetNumber: '',
          postalCode: '',
          shippingAddress: true,
          billingAddress: false,
          defaultShippingAddress: false,
          defaultBillingAddress: false,
        },
      ],
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
    formState: { errors, isSubmitting },
  } = form;

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
      clearErrors('root');
      if (result?.ok) {
        showSuccess('Successful Registration!');
        await router.push(callbackUrl);
        // window.location.href = '/';
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError('root.server', {
          type: 'manual',
          message: e.message,
        } as FieldError);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form className="form-registration" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={1} className="m-5">
          <Typography variant="caption" sx={{ fontSize: '16px' }}>
            Already have an account?
            <Button component={Link} variant="outlined" href="/sign-in" sx={{ ml: '10px' }}>
              Log in
            </Button>
          </Typography>

          <InputEmail register={register} errors={errors} name="email" />

          <InputPassword register={register} errors={errors} name="password" label="Password" />

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

          <LoadingButton type="submit" isLoading={isSubmitting}>
            Registration
          </LoadingButton>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });
  return { props: { authorized } };
};
