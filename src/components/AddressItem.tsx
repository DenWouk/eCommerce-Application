import { Autocomplete, Box, Button, FormControlLabel, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { get, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import CheckBoxTypeAddress from '@/src/components/CheckboxTypeAddress';
import { countries } from '@/src/enums/countries';
import { NameAddress, TypeAddress } from '@/src/components/Address';
import { IFormInput } from '@/src/interfaces/IFormInput';

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

const validatePostalCode = (countryCode: string, value: string) => {
  let pattern;
  switch (countryCode) {
    case 'Canada':
      pattern = /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/;
      break;
    case 'United States':
      pattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
      break;
    default:
      pattern = /^.+$/;
  }
  return pattern.test(value);
};

type Props = {
  typeAddresses: TypeAddress[];
  index: number;
  handleRemove: (index: number) => void;
};

export default function AddressItem({ typeAddresses, index, handleRemove }: Props) {
  const typeAddress = typeAddresses[index];

  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<IFormInput, string>();

  // const [defBillingValue = '', defShippingValue = ''] = watch([
  //   'defaultBillingAddress',
  //   'defaultShippingAddress',
  // ]);
  // defBillingValue &&
  // +defBillingValue === index &&
  // setValue(`addresses.${index}.billingAddress`, `${index}`);
  // defShippingValue &&
  // +defShippingValue === index &&
  // setValue(`addresses.${index}.shippingAddress`, `${index}`);

  return (
    <>
      <Typography variant="h4">{typeAddress} address</Typography>
      <CheckBoxTypeAddress
        name={`addresses.${index}.shippingAddress`}
        hidden={typeAddresses[index] === TypeAddress.SHIPPING}
        label="ShippingAddress"
        register={register}
      />
      <CheckBoxTypeAddress
        name={`addresses.${index}.billingAddress`}
        hidden={typeAddresses[index] === TypeAddress.BILLING}
        label="BillingAddress"
        register={register}
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

      {typeAddresses.length > 1 && (
        <Button onClick={() => handleRemove(index)}>remove address</Button>
      )}

      <Autocomplete
        className="dark:bg-white"
        options={countries}
        autoHighlight
        getOptionLabel={(option: any) => option.label}
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
        type="string"
        {...register(`addresses.${index}.postalCode`, {
          validate: (value) => {
            // const validationResult = validatePostalCode(get(field, 'country'), value as string);
            // return validationResult || 'Invalid ZIP code format';
            const selectedCountry = watch(`addresses.${index}.country`); // Watch the selected country
            const validationResult = validatePostalCode(selectedCountry, value as string);
            return validationResult || 'Invalid ZIP code format';
          },
        })}
        error={!!errors!.addresses?.[index]?.postalCode}
        helperText={errors!.addresses?.[index]?.postalCode?.message}
      />
    </>
  );
}
