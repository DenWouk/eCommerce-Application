import { Stack, Button } from '@mui/material';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ErrorMessage from '@/src/components/ErrorMessage';
import NamesClients from '@/src/helpers/commercetools/consts';
import LoadingButton from '@/src/components/LoadingButton';
import { AuthProps } from '@/src/types/auth';
import isAuthorized from '@/src/helpers/auth';
import { showSuccess } from '@/src/helpers/toastify';
import { IFormInput } from '../interfaces/IFormInput';
import InputEmail from '../components/InputEmail';
import InputPassword from '../components/InputPassword';

export default function SignInPage() {
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
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    try {
      const result = await signIn(NamesClients.PASSWORD, {
        username: email,
        password,
        redirect: false,
      });
      clearErrors('root');
      if (result?.ok) {
        router.replace('/');
        showSuccess('Successful login!');
      }
      if (result?.error) {
        setError('root.server', {
          type: 'manual',
          message: result.error,
        } as FieldError);
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
    <form className="form-registration" onSubmit={handleSubmit(onSubmit)}>
      <Stack className="m-5" spacing={1}>
        <InputEmail register={register} errors={errors} name="email" />

        <InputPassword register={register} errors={errors} name="password" />

        {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}

        <LoadingButton type="submit" isLoading={isSubmitting}>
          Sign in
        </LoadingButton>

        <Button component={Link} variant="outlined" href="/sign-up">
          Registration
        </Button>
      </Stack>
    </form>
  );
}
export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });
  return { props: { authorized } };
};
