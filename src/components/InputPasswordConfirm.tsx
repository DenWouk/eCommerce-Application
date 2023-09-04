import { IconButton, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { get, RegisterOptions } from 'react-hook-form';
import { ITextParams } from '../interfaces/ITextParams';

export default function InputPasswordConfirm({  register, name, getValues, label, errors, disabled }: ITextParams) {
  const [showPass, setShowPass] = useState(false);
  const togglePassVisibility = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };
  const validateText: RegisterOptions = {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
    validate: {
      uppercase: (value: string) =>
        /^(?=.*[A-Z])/.test(value) || 'Password must contain at least one uppercase letter',
      digit: (value: string) =>
        /^(?=.*\d)/.test(value) || 'Password must contain at least one digit',
      specialChar: (value: string) =>
        /^(?=.*[!@#$%^&*])/.test(value) || 'Password must contain at least one special character',
      noLeadingTrailingWhitespace: (value: string) =>
        value.trim() === value ? undefined : 'Password cannot have leading or trailing whitespace',
      lowercase: (value: string) =>
        /^(?=.*[a-z])/.test(value) || 'Password must contain at least one lowercase letter',
      noNonLatinChars: (value: string) =>
        /^[A-Za-z\d!@#$%^&*]*$/.test(value) ||
        'Password can only contain Latin letters, digits, and special characters',
      confirmPass: (value: string) => getValues!('password') !== value ? 'Your passwords do no match' : undefined,
    },
  };
  const error = get(errors, name);

  return (
    <TextField
      required
      disabled={disabled}
      label={label}
      type={showPass ? 'text' : 'password'}
      className="dark:bg-white"
      {...register(name, validateText)}
      error={!!error}
      helperText={error?.message}
      InputProps={{
        endAdornment: (
          <Tooltip title={!showPass ? 'Show Password' : 'Hide Password'} arrow>
            <IconButton onClick={togglePassVisibility}>
              {showPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Tooltip>
        ),
      }}
    />
  );
}
