/* eslint-disable import/no-extraneous-dependencies */
import { Stack, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Form from '../components/Form';
import { IFormInput } from './interfaces/IFormInput';
import InputEmail from '../components/InputEmail';
import InputPassword from '../components/InputPassword';
import apiRequest from '../helpers/api-req';

function SignInPage() {
  const form = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (data: IFormInput) => {
    await apiRequest('api-signin', 'POST', JSON.stringify(data));
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        email: '',
        password: '',
      }}
    >
      <Typography variant="h4" className="m-10">
        Log in
      </Typography>
      <InputEmail register={register} errors={errors} name="email" />
      <InputPassword register={register} errors={errors} name="password" />
      <Stack spacing={2}>
        <Button variant="outlined" type="submit">
          Log in
        </Button>
        <Button variant="outlined" href="/sign-up">
          Sign up
        </Button>
      </Stack>
    </Form>
  );
}
export default SignInPage;
