import { Checkbox, FormControlLabel } from '@mui/material';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { IFormInput } from '@/src/interfaces/IFormInput';
import { ITextParams } from '../interfaces/ITextParams';

type Props = Omit<ITextParams, 'register' | 'control'> & {
  label: string;
  register: UseFormRegister<IFormInput>;
  hidden: boolean;
};

export default function CheckBoxTypeAddress({ name, register, label, hidden }: Props) {
  return (
    <FormControlLabel
      label={label}
      hidden={hidden}
      control={<Checkbox {...register(name)} />}
    />
  );
}
