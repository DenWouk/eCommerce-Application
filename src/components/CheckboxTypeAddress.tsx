import { Checkbox, FormControlLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { IFormInput } from '@/src/pages/interfaces/IFormInput';
import { ITextParams } from '../pages/interfaces/ITextParams';

type Props = Omit<ITextParams, 'register' | 'control'> & {
  index: number;
  label: string;
  control: Control<IFormInput, string>;
};

export default function CheckBoxTypeAddress({ name, control, index, label }: Props) {
  // const validateText = {
  //   required: 'First name is required',
  //   pattern: {
  //     value: /[a-zA-Z]/,
  //     message: 'First name must contain at least one letter',
  //   },
  // };
  // const error = get(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              className="dark:bg-white"
              checked={!!value}
              onChange={(e) => {
                const { checked } = e.target;
                onChange(checked ? index.toString() : '');
              }}
              // error={!!error}
              // helperText={error?.message}
            />
          }
        />
      )}
    />
  );
}
