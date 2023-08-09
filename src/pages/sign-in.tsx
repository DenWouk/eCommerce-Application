/* eslint-disable import/no-extraneous-dependencies */
import { Stack, TextField, Typography, Button, Icon } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

interface IFormInput {
  email: string;
  password: string;
}

function SignInPage() {
  const form = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPass, setShowPass] = useState(false);

  const togglePassVisibility = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: IFormInput) => {
    console.log(JSON.stringify(data), 'data');
  };

  const emailValidation = {
    required: 'Email Address is required',
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Please enter a valid email address',
    },
  };
  const passwordValidation = {
    required: 'Password is required',
    value: {
      minLength: 8,
      message: 'Password must be at least 8 characters long',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).$/,
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
    },
    validate: {
      noLeadingTrailingWhitespace: (value: string) =>
        value.trim() === value ? undefined : 'Password cannot have leading or trailing whitespace',
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2} className="m-10" width={400}>
        <Typography variant="h4"> Log in </Typography>
        <TextField
          required
          id="outlined-required"
          className="dark:bg-white"
          label="Email"
          type="email"
          {...register('email', emailValidation)}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type={showPass ? 'text' : 'password'} // Toggle password visibility based on showPass state
          className="dark:bg-white"
          autoComplete="current-password"
          {...register('password', passwordValidation)}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <Icon onClick={togglePassVisibility}>
                {showPass ? <VisibilityOff /> : <Visibility />}
              </Icon>
            ),
          }}
          // sx={{
          //   backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#000'),
          //   border: '1px solid',
          //   borderColor: (theme) => (theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0'),
          //   padding: '8px',
          //   borderRadius: '4px',
          //   textAlign: 'center',
          //   color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'inherit'),
          // }}
        />
        <Button variant="outlined" type="submit">
          Sign in
        </Button>
        <Button variant="outlined" href="/sign-up">
          Sign up
        </Button>
      </Stack>
    </form>
  );
}
export default SignInPage;
