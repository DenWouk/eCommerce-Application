import {
  TextField,
  Typography,
  Stack,
  Box,
  Autocomplete,
  Button,
  FormControlLabel,
} from '@mui/material';
import Image from 'next/image';
import { Control, get, useFieldArray } from 'react-hook-form';
import CheckBoxTypeAddress from '@/src/components/CheckboxTypeAddress';
import { IFormInput } from '@/src/pages/interfaces/IFormInput';
import countries from '../pages/enums/countries';
import { ITextParams } from '../pages/interfaces/ITextParams';

// type countryCode = 'US'| 'CA';

type Props = Omit<ITextParams, 'control'> & {
  control: Control<IFormInput, string>;
};

function Address({ register, errors, control }: Props) {
  const validateCountry = {
    required: 'Country is required',
  };
  const validateCity = {
    required: `City is required`,
    pattern: {
      value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
      message: `City must contain at least one letter`,
    },
  };
  const validateStreet = {
    required: `Street is required`,
    pattern: {
      value: /^.+$/,
      message: 'Street must contain at least one character',
    },
  };
  const validateStreetNumber = {
    required: `Number is required`,
    pattern: {
      value: /^.+$/,
      message: 'Must contain at least one character',
    },
  };

  const validatePost = {
    pattern: /^\d{5}(?:-\d{4})?$/, // US ZIP code pattern
    message: 'Invalid US ZIP code format',
  };

  // const postalPatterns: Record<string, RegExp> = {
  //   "US": /^\d{5}(?:-\d{4})?$/,
  //   "CA": /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/,
  // };
  // function getPostalValidation(countryCode: countryCode) {
  //   if (!postalPatterns[countryCode]) {
  //     return {
  //       message: 'Invalid postal code format', // Default message
  //     };
  //   }

  //   return {
  //     pattern: postalPatterns[countryCode],
  //     message: `Invalid ${countryCode} postal code format`,
  //   };
  // }

  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
    control,
  });

  return (
    <>
      {fields.map((field, index) => (
        <Stack key={field.id} spacing={2} className="m-10" width={400}>
          <Typography variant="h4">Address</Typography>
          <CheckBoxTypeAddress
            name={`addresses.${index}.shippingAddress`}
            index={index}
            label="ShippingAddress"
            control={control}
          />
          <CheckBoxTypeAddress
            name={`addresses.${index}.billingAddress`}
            index={index}
            label="BillingAddress"
            control={control}
          />
          <FormControlLabel
            label="DefaultShippingAddress"
            control={
              <input
                type="radio"
                className="dark:bg-white"
                {...register(`defaultShippingAddress`)}
                value={index}
                // error={!!error}
                // helperText={error?.message}
              />
            }
          />
          <FormControlLabel
            label="DefaultBillingAddress"
            control={
              <input
                type="radio"
                className="dark:bg-white"
                {...register(`defaultBillingAddress`)}
                value={index}
                // error={!!error}
                // helperText={error?.message}
              />
            }
          />
          <Button onClick={() => remove(index)}>remove address</Button>
          <Autocomplete
            className="dark:bg-white"
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <Image
                  loading="lazy"
                  width="20"
                  height="20"
                  src={`https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@master/svg/${option.code.toLowerCase()}.svg`}
                  alt={`${option.code.toLowerCase()}`}
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                type="country"
                {...register(`addresses.${index}.country`, validateCountry)}
                error={!!get(errors, `addresses.${index}.country`)}
                helperText={errors!.addresses?.[index]?.country?.message}
              />
            )}
          />
          <TextField
            required
            id="outlined-required-city"
            className="dark:bg-white"
            label="City"
            type="text"
            {...register(`addresses.${index}.city`, validateCity)}
            error={!!errors!.addresses?.[index]?.city}
            helperText={errors!.addresses?.[index]?.city?.message}
          />
          <TextField
            required
            id="outlined-required-streetname"
            className="dark:bg-white"
            label="Street Name"
            type="text"
            {...register(`addresses.${index}.streetName`, validateStreet)}
            error={!!errors!.addresses?.[index]?.streetName}
            helperText={errors!.addresses?.[index]?.streetName?.message}
            sx={{
              width: 280,
              mr: 10,
            }}
          />
          <TextField
            required
            id="outlined-required-streetnum"
            className="dark:bg-white"
            label=""
            type="text"
            {...register(`addresses.${index}.streetNumber`, validateStreetNumber)}
            error={!!errors!.addresses?.[index]?.streetNumber}
            helperText={errors!.addresses?.[index]?.streetNumber?.message}
            sx={{
              width: 100,
            }}
          />
          <TextField
            required
            id="outlined-required-postal"
            className="dark:bg-white"
            label="Post"
            type="number"
            {...register(`addresses.${index}.postalCode`, validatePost)}
            error={!!errors!.addresses?.[index]?.postalCode}
            helperText={errors!.addresses?.[index]?.postalCode?.message}
          />
        </Stack>
      ))}
      <Button onClick={() => append({ country: '' })}>Add address</Button>
    </>
  );
}

export default Address;
