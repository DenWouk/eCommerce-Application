import { Checkbox, FormControlLabel } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { IFormInput } from '@/src/interfaces/IFormInput';
import { ITextParams } from '@/src/interfaces/ITextParams';

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
      control={<Checkbox className="dark:bg-white" {...register(name)} />}
    />
  );
}
