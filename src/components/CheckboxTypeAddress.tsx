import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { IFormInput } from '@/src/interfaces/IFormInput';
import { DefNameAddress } from '@/src/enums/address';
import { ITextParams } from '../interfaces/ITextParams';

type Props = Omit<ITextParams, 'register' | 'control'> & {
  label: string;
  interacts: DefNameAddress;
  hidden: boolean;
  index: number;
};

export default function CheckBoxTypeAddress({
  name,
  interacts,
  index,
  label,
  hidden,
  disabled,
}: Props) {
  const { getValues, control, setValue } = useFormContext<IFormInput, string>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          style={hidden ? { display: 'none' } : undefined}
          label={label}
          control={
            <Checkbox
              disabled={disabled}
              checked={!!value}
              value={value}
              onChange={(e) => {
                const typeAddress = interacts;
                const { checked } = e.target;
                if (!checked) {
                  const values = getValues('addresses');
                  values[index][typeAddress] &&
                    setValue(`addresses.${index}.${typeAddress}`, false);
                }
                onChange(checked);
              }}
            />
          }
        />
      )}
    />
  );
}
