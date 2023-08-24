import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from 'react-hook-form';
import { ITextParams } from '../pages/interfaces/ITextParams';

export default function InputDate({ control }: ITextParams) {
  function minYear(date: Date, age: number) {
    const copyDate = new Date(date);
    copyDate.setFullYear(date.getFullYear() - age);
    return copyDate;
  }
  const minBirthdate = minYear(new Date(), 13);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 13);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name="dateOfBirth"
        control={control}
        rules={{
          required: true,
          validate: {
            min: (date) => (date as Date) <= minBirthdate || 'You should be at least 13 years old',
          },
        }}
        render={({ field: { ref, onBlur, name, onChange, ...field }, fieldState }) => (
          <DatePicker
            {...field}
            inputRef={ref}
            onChange={onChange}
            label="Date of Birth"
            className="dark:bg-white"
            maxDate={maxDate}
            slotProps={{
              textField: {
                required: true,
                onBlur,
                name,
                error: !!fieldState?.error,
                helperText: fieldState?.error?.message,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
