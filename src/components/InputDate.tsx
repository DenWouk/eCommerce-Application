import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from 'react-hook-form';
import { ITextParams } from '../interfaces/ITextParams';

export default function InputDate({ control }: ITextParams) {
  const currentDate = new Date();
  function minusYear(date: Date, age: number) {
    const copyDate = new Date(date);
    copyDate.setFullYear(date.getFullYear() - age);
    return copyDate;
  }
  const maxDate = minusYear(currentDate, 13);
  const minDate = minusYear(currentDate, 120);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name="dateOfBirth"
        control={control}
        rules={{
          required: 'You should be at least 13 years old',
          validate: {
            min: (date) => (date as Date) >= minDate || 'You should be at more 120 years old',
            max: (date) => (date as Date) <= maxDate || 'You should be at least 13 years old',
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
            minDate={minDate}
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
