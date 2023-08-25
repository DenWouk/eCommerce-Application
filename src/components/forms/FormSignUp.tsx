import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import InputEmail from '@/src/components/InputEmail';
import InputPassword from '@/src/components/InputPassword';
import ErrorMessage from '@/src/components/ErrorMessage';
import LoadingButton from '@/src/components/LoadingButton';
import { IFormInput } from '@/src/interfaces/IFormInput';
import InputFirstName from '@/src/components/InputFirstName';
import InputLastName from '@/src/components/InputLastName';
import InputDate from '@/src/components/InputDate';
import Address from '@/src/components/Address';
import createCustomerDraft from '@/src/helpers/commercetools/customerDraft';
import { getTokenForCrosscheck, signInForCrosscheck } from '@/src/api/signInForCrossCheck';
import signUpForCrosscheck from '@/src/api/signUpForCrossCheck';
import NamesClients from '@/src/helpers/commercetools/consts';

type Props = {
  showSuccess: () => void;
  showError: (message: string) => void;
  className: string;
  onRoute: Dispatch<SetStateAction<boolean>>;
};

export default function FormSignUp(props: Props) {
  const { showSuccess, className, onRoute } = props;
  const router = useRouter();
  const form = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    setError,
    clearErrors,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = form;

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
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={`form-registration absolute ${className}`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={1} className="m-5">
          <Typography variant="caption" sx={{ fontSize: '16px' }}>
            Already have an account?
            <Button
              component={Link}
              variant="outlined"
              href="/sign-in"
              sx={{ ml: '10px' }}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/sign-in');
                onRoute(false);
              }}
            >
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
