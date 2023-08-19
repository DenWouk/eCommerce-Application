import { Stack, Button, Typography, Alert } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import signIn from '@/src/api/signIn';
// import Form from '../components/Form';
import { IFormInput } from './interfaces/IFormInput';
import InputEmail from '../components/InputEmail';
import InputPassword from '../components/InputPassword';

function SignInPage() {
  const form = useForm<IFormInput>({
    defaultValues: {
      email: 'zakalupali2@gmail.com',
      password: 'K33666655!',
    },
  });

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
      await signIn({ username: email, password });
      clearErrors('root');
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2} className="m-10" width={400}>
        <Typography variant="h4" className="m-10">
          Log in
        </Typography>
        <InputEmail register={register} errors={errors} name="email" />
        <InputPassword register={register} errors={errors} name="password" />
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
        {errors?.root ? <Alert severity="error">{errors.root.server.message}</Alert> : <></>}
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
