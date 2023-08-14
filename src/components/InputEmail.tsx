import { TextField } from '@mui/material';
import { ITextParams } from '../pages/interfaces/ITextParams';

export default function InputEmail({ register, name, errors }: ITextParams) {
  const validateText = {
    required: 'Email Address is required',
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Please enter a valid email address',
    },
  };
  return (
    <TextField
      required
      id="outlined-required-emails"
      className="dark:bg-white"
      label="Email"
      type="email"
      {...register(name, validateText)}
      error={!!errors![name]}
      helperText={errors![name]?.message}
    />
  );
}
