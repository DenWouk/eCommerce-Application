import { TextField } from '@mui/material';
import { get } from 'react-hook-form';
import { ITextParams } from '../interfaces/ITextParams';

export default function InputFirstName({ register, name, errors, disabled }: ITextParams) {
  const validateText = {
    required: 'First name is required',
    pattern: {
      value: /^[a-zA-Zа-яА-Я]+$/,
      message: 'First name must contain at least one letter',
    },
  };
  const error = get(errors, name);

  return (
    <TextField
      required
      disabled={disabled}
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
