import { IconButton, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { get } from 'react-hook-form';
import { ITextParams } from '../interfaces/ITextParams';

export default function InputPassword({ register, name, errors, disabled = false }: ITextParams) {
  const [showPass, setShowPass] = useState(false);
  const togglePassVisibility = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };
  const validateText = {
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
    },
  };
  const error = get(errors, name);

  return (
    <TextField
      required
      disabled={disabled}
      id="outlined-password-input"
      label="Password"
      type={showPass ? 'text' : 'password'}
      className="dark:bg-white"
      autoComplete="current-password"
      {...register(name, validateText as any)}
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
