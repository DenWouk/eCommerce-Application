import { TextField } from '@mui/material';
import { get, RegisterOptions } from 'react-hook-form';
import { IFormInput } from '@/src/interfaces/IFormInput';
import { ITextParams } from '../interfaces/ITextParams';

export default function InputEmail({ register, name, errors, disabled = false }: ITextParams) {
  const validateText: RegisterOptions = {
    required: 'Email Address is required',
    validate: {
      noLeadingTrailingWhitespace: (value: IFormInput['email']) =>
        value.trim() === value ? undefined : 'Email cannot have leading or trailing whitespace',
      validEmail: (value: IFormInput['email']) =>
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
      {...register(name, validateText)}
      error={!!error}
      helperText={error?.message}
    />
  );
}
