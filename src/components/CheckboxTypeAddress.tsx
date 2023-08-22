import { Checkbox, FormControlLabel } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
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
      style={hidden ? { display: 'none' } : undefined}
      label={label}
      control={<Checkbox {...register(name)} />}
    />
  );
}
