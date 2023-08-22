import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from 'react-hook-form';
import { ITextParams } from '../interfaces/ITextParams';

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
            min: (date) => (date as Date) <= minBirthdate || 'Please, enter a valid date',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            label="Date of Birth"
            className="dark:bg-white"
            maxDate={maxDate}
          />
        )}
      />
    </LocalizationProvider>
  );
}
