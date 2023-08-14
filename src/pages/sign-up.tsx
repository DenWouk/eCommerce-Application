/* eslint-disable import/no-extraneous-dependencies */
import { Button, Checkbox, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import Form from '../components/Form';
import InputEmail from '../components/InputEmail';
import { IFormInput } from './interfaces/IFormInput';
import InputPassword from '../components/InputPassword';
import InputFirstName from '../components/InputFirstName';
import InputLastName from '../components/InputLastName';
import apiRequest from '../helpers/api-req';
import Address from '../components/Address';
import InputDate from '../components/InputDate';

function SignUpPage() {
  const form = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      // checkbox: false,
      country: '',
      streetName: '',
      streetNum: '',
      city: '',
      postalCode: '',
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: IFormInput) => {
    console.log(JSON.stringify(data));
    await apiRequest('api-signup', 'POST', JSON.stringify(data));
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        checkbox: false,
        country: '',
        city: '',
        streetName: '',
        streetNum: '',
        postalCode: '',
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
      <Address register={register} errors={errors} name="city" />
      <Controller
        name="checkbox"
        control={control}
        render={({ field }) => <Checkbox {...field} />}
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
