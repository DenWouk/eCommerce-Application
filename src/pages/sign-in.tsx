import { Stack, Button } from '@mui/material';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import ErrorMessage from '@/src/components/ErrorMessage';
import NamesClients from '@/src/helpers/commercetools/consts';
import LoadingButton from '@/src/components/LoadingButton';
import { IFormInput } from '../interfaces/IFormInput';
import InputEmail from '../components/InputEmail';
import InputPassword from '../components/InputPassword';
import { getTokenForCrosscheck, signInForCrosscheck } from '../api/signInForCrossCheck';

const showSuccess = () => {
  toast.success('Successful Login!', {
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

function SignInPage() {
  const form = useForm<IFormInput>({
    mode: 'onChange',
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
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    try {
      const token = await getTokenForCrosscheck({ username: email, password });
      await signInForCrosscheck({ username: email, password }, token.access_token);

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
        showError(e.message);
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
export default SignInPage;
