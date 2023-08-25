import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import InputEmail from '@/src/components/InputEmail';
import InputPassword from '@/src/components/InputPassword';
import ErrorMessage from '@/src/components/ErrorMessage';
import LoadingButton from '@/src/components/LoadingButton';
import { IFormInput } from '@/src/interfaces/IFormInput';
import { getTokenForCrosscheck, signInForCrosscheck } from '@/src/api/signInForCrossCheck';
import NamesClients from '@/src/helpers/commercetools/consts';

type Props = {
  showSuccess: () => void;
  showError: (message: string) => void;
  className: string;
  onRoute: Dispatch<SetStateAction<boolean>>;
};

export default function FormSignIn(props: Props) {
  const { showSuccess, showError, className, onRoute } = props;
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
    <form className={`form-registration absolute ${className}`} onSubmit={handleSubmit(onSubmit)}>
      <Stack className="m-5" spacing={1}>
        <InputEmail register={register} errors={errors} name="email" />

        <InputPassword register={register} errors={errors} name="password" />

        {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}

        <LoadingButton type="submit" isLoading={isSubmitting}>
          Sign in
        </LoadingButton>

        <Button
          component={Link}
          variant="outlined"
          href="/sign-up"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, 'KIS KIS KIS', '/sign-up');
            onRoute(true);
          }}
        >
          Registration
        </Button>
      </Stack>
    </form>
  );
}
