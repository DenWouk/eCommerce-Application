import { TextField } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { get } from 'react-hook-form';
import { ITextParams } from '../pages/interfaces/ITextParams';

export default function InputEmail({ register, name, errors, disabled = false }: ITextParams) {
  const validateText = {
    required: 'Email Address is required111',
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Please enter a valid email address',
    },
  };
  const error = get(errors, name);
  return (
    <TextField
      required
      disabled={disabled}
      id="outlined-required-emails"
      className="dark:bg-white"
      label="Email"
      type="email"
      {...register(name, validateText)}
      error={!!error}
      helperText={error?.message}
      autoComplete="username"
    />
  );
}
