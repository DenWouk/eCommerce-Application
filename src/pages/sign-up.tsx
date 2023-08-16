import { Button, Checkbox, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import signUp from '@/src/api/signUp';
import createCustomerDraft from '@/src/helpers/commercetools/customerDraft';
import Form from '../components/Form';
import InputEmail from '../components/InputEmail';
import { IFormInput } from './interfaces/IFormInput';
import InputPassword from '../components/InputPassword';
import InputFirstName from '../components/InputFirstName';
import InputLastName from '../components/InputLastName';
import Address from '../components/Address';
import InputDate from '../components/InputDate';

function SignUpPage() {
  const form = useForm<IFormInput>({
    defaultValues: {
      email: 'zakalupali2@gmail.com',
      password: 'K33666655!',
      firstName: 'Kir',
      lastName: 'Yur',
      // dateOfBirth: new Date(),
      // checkbox: false,
      addresses: [],
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    const customerDraft = createCustomerDraft(data);
    const customer = await signUp(customerDraft);
    console.log(customer);
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        email: 'zakalupali2@gmail.com',
        password: 'K33666655!',
        firstName: 'Kir',
        lastName: 'Yur',
        // dateOfBirth: new Date(),
        // checkbox: false,
        addresses: [],
      }}
    >
      <Typography variant="h4" className="m-10">
        Register
      </Typography>
      <InputEmail register={register} errors={errors} name="email" />
      <InputPassword register={register} errors={errors} name="password" />
      <InputFirstName register={register} errors={errors} name="firstName" />
      <InputLastName register={register} errors={errors} name="lastName" />
      <InputDate register={register} control={control} errors={errors} name="dateOfBirth" />
      <Address register={register} control={control} errors={errors} name="addresses" />
      <Controller
        name="checkbox"
        control={control}
        render={({ field }) => <Checkbox className="bg-amber-50" {...field} />}
      />

      <Button variant="outlined" type="submit">
        Sign up
      </Button>
      <Typography variant="caption">
        Already have an account?
        <Button variant="outlined" href="/sign-in">
          Log in
        </Button>
      </Typography>
    </Form>
  );
}
export default SignUpPage;
