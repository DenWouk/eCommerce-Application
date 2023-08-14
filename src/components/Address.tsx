import { TextField, Typography, Stack, Box, Autocomplete } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import countries from '../pages/enums/countries';
import { ITextParams } from '../pages/interfaces/ITextParams';

interface ICountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
// type countryCode = 'US'| 'CA';

function Address({ register, errors }: ITextParams) {
  const [autocompleteValue, setAutocompleteValue] = useState<ICountryType | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<ICountryType | null>(null);
  const isCountrySelected = selectedCountry !== null;

  useEffect(() => {
    setSelectedCountry(autocompleteValue);
  }, [autocompleteValue]);

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
  const validateStreetNum = {
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

  return (
    <Stack spacing={2} className="m-10" width={400}>
      <Typography variant="h4"> Address </Typography>
      <Autocomplete
        className="dark:bg-white"
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        value={autocompleteValue}
        onChange={(_, value) => setAutocompleteValue(value)}
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
          <>
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
              type="country"
              {...register('country', validateCountry)}
              error={!!errors!.country}
              helperText={errors!.country?.message}
            />
            {/* Display error message if no country is selected */}
            {!isCountrySelected && (
              <Typography variant="body2" color="error">
                Please select a country.
              </Typography>
            )}
          </>
        )}
      />
      <TextField
        required
        id="outlined-required-city"
        className="dark:bg-white"
        label="City"
        type="text"
        {...register('city', validateCity)}
        error={!!errors!.city}
        helperText={errors!.city?.message}
      />
      <TextField
        required
        id="outlined-required-streetname"
        className="dark:bg-white"
        label="Street Name"
        type="text"
        {...register('streetName', validateStreet)}
        error={!!errors!.streetName}
        helperText={errors!.streetName?.message}
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
        {...register('streetNum', validateStreetNum)}
        error={!!errors!.streetNum}
        helperText={errors!.streetNum?.message}
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
        {...register('postalCode', validatePost)}
        error={!!errors!.postalCode}
        helperText={errors!.postalCode?.message}
      />
     
    </Stack>
  );
}

export default Address;
