import { Button, Stack, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import signUp from '@/src/api/signUp';
import createCustomerDraft from '@/src/helpers/commercetools/customerDraft';
import InputEmail from '../components/InputEmail';
import { IFormInput } from './interfaces/IFormInput';
import InputPassword from '../components/InputPassword';
import InputFirstName from '../components/InputFirstName';
import InputLastName from '../components/InputLastName';
import Address from '../components/Address';
import InputDate from '../components/InputDate';

function SignUpPage() {
  const onSubmit = async (data: IFormInput) => {
    const customerDraft = createCustomerDraft(data);
    await signUp(customerDraft);
  };

  const form = useForm<IFormInput>({
    defaultValues: {
      email: 'zakalupali2@gmail.com',
      password: 'K33666655!',
      firstName: 'Kir',
      lastName: 'Yur',
      dateOfBirth: new Date(),
      addresses: [],
    },
  });
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  return (
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
        <Address register={register} control={control} errors={errors} name="addresses" watch={watch}/>
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
  );
}
export default SignUpPage;
