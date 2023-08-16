import { TextField } from '@mui/material';
import { get } from 'react-hook-form';
import { ITextParams } from '../pages/interfaces/ITextParams';

export default function InputFirstName({ register, name, errors }: ITextParams) {
  const validateText = {
    required: 'First name is required',
    pattern: {
      value: /[a-zA-Z]/,
      message: 'First name must contain at least one letter',
    },
  };
  const error = get(errors, name);

  return (
    <TextField
      required
      id="outlined-firstname-input"
      label="First Name"
      type="text"
      className="dark:bg-white"
      {...register(name, validateText)}
      error={!!error}
      helperText={error?.message}
    />
  );
}
