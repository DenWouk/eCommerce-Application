import { TextField } from '@mui/material';
import { get } from 'react-hook-form';
import { ITextParams } from '../interfaces/ITextParams';

export default function InputEmail({ register, name, errors, disabled = false }: ITextParams) {
  const validateText = {
    required: 'Email Address is required',
    validate: {
      noLeadingTrailingWhitespace: (value: string) =>
        value.trim() === value ? undefined : 'Email cannot have leading or trailing whitespace',
      validEmail: (value: string) =>
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) ||
        'Please enter a valid email address',
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
      type="text"
      {...register(name, validateText as any)}
      error={!!error}
      helperText={error?.message}
    />
  );
}
