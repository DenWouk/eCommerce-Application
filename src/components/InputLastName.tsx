import { TextField } from '@mui/material';
import { get } from 'react-hook-form';
import { ITextParams } from '../interfaces/ITextParams';

export default function InputLastName({ register, name, errors, disabled }: ITextParams) {
  const validateText = {
    required: 'Last name is required',
    pattern: {
      value: /^[a-zA-Zа-яА-Я]+$/,
      message: 'Name cannot contain special characters or numbers',
    },
  };
  const error = get(errors, name);

  return (
    <TextField
      required
      disabled={disabled}
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
