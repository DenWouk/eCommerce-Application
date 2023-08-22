import { TextField } from '@mui/material';
import { get } from 'react-hook-form';
import { ITextParams } from '../interfaces/ITextParams';

export default function InputLastName({ register, name, errors }: ITextParams) {
  const validateText = {
    required: 'Last name is required',
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Name cannot contain special characters or numbers',
    },
  };
  const error = get(errors, name);

  return (
    <TextField
      required
      id="outlined-lastname-input"
      label="Last Name"
      type="text"
      className="dark:bg-white"
      {...register(name, validateText)}
      error={!!error}
      helperText={error?.message}
    />
  );
}
