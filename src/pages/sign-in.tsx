import { Stack, Button, Typography } from '@mui/material';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import ErrorMessage from '@/src/components/ErrorMessage';
import NamesClients from '@/src/helpers/commercetools/consts';
import { IFormInput } from './interfaces/IFormInput';
import InputEmail from '../components/InputEmail';
import InputPassword from '../components/InputPassword';

function SignInPage() {
  const form = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
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
        router.push(`/`);
      }
      if (result?.error) {
        setError('root.server', {
          type: 'manual',
          message: result.error,
        } as FieldError);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" className="m-10">
        Log in
      </Typography>
      <InputEmail register={register} errors={errors} name="email" />
      <InputPassword register={register} errors={errors} name="password" />
      {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}
      <Stack spacing={2}>
        <Button variant="outlined" type="submit">
          Log in
        </Button>
        <Button component={Link} variant="outlined" href="/sign-up">
          Sign up
        </Button>
      </Stack>
    </form>
  );
}
export default SignInPage;
