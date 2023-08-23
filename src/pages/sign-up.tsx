import { Button, Stack, Typography } from '@mui/material';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import ErrorMessage from '@/src/components/ErrorMessage';
import NamesClients from '@/src/helpers/commercetools/consts';
import createCustomerDraft from '@/src/helpers/commercetools/customerDraft';
import signUpForCrosscheck from '@/src/api/signUpForCrossCheck';
import LoadingButton from '@/src/components/LoadingButton';
import InputEmail from '../components/InputEmail';
import { IFormInput } from '../interfaces/IFormInput';
import InputPassword from '../components/InputPassword';
import InputFirstName from '../components/InputFirstName';
import InputLastName from '../components/InputLastName';
import Address from '../components/Address';
import InputDate from '../components/InputDate';
import { getTokenForCrosscheck, signInForCrosscheck } from '../api/signInForCrossCheck';

function SignUpPage() {
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
          country: '',
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
      const tokenForSignUp = await getTokenForCrosscheck();
      await signUpForCrosscheck(customerDraft, tokenForSignUp.access_token);
      const tokenForSignIn = await getTokenForCrosscheck({ username: email, password });
      await signInForCrosscheck({ username: email, password }, tokenForSignIn.access_token);
      const result = await signIn(NamesClients.PASSWORD, {
        username: email,
        password,
        redirect: false,
      });
      clearErrors('root');
      if (result?.ok) {
        router.push('/');
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
      <form className="form-registration" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={1} className="m-5">
          <Typography variant="caption" sx={{ fontSize: '16px' }}>
            Already have an account?
            <Button component={Link} variant="outlined" href="/sign-in" sx={{ ml: '10px' }}>
              Log in
            </Button>
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

          <LoadingButton type="submit" isLoading={isSubmitting}>
            Registration
          </LoadingButton>
        </Stack>
      </form>
    </FormProvider>
  );
}
export default SignUpPage;
