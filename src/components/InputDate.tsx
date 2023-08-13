/* eslint-disable import/no-extraneous-dependencies */
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import { ITextParams } from '../pages/interfaces/ITextParams';

export default function InputDate({ control, errors, name }: ITextParams) {
  function minYear(date: Date, age: number) {
    const copyDate = new Date(date);
    copyDate.setFullYear(date.getFullYear() - age);
    return copyDate;
  }
  const minBirthdate = minYear(new Date(), 13);

  const validateDate = {
    required: 'Birth Date is required',
    validate: (value: any) => {
      const dob = new Date(value);
      return dob >= minBirthdate || 'You must be at least 13 years old';
    },
  };

  return (
    <Controller
      control={control}
      name="dateOfBirth"
      defaultValue={undefined}
      rules={validateDate}
      render={({ field: { value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value}
            {...field}
            onChange={(date) => {
              console.log(date);
              
            }}
            label="Date of Birth"
            className="dark:bg-white"
            // {...register(name, validateAge)}
          />
        </LocalizationProvider>
      )}
    />
  );
}
