import {
  TextField,
  Typography,
  Stack,
  Box,
  Autocomplete,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Image from 'next/image';
import {
  Control,
  UseFormWatch,
  get,
  useFieldArray,
  UseFormSetValue,
  UseFormGetValues,
  useFormContext,
  Controller,
} from 'react-hook-form';
import { useState } from 'react';
import CheckBoxTypeAddress from '@/src/components/CheckboxTypeAddress';
import { DefNameAddress, TypeAddress } from '@/src/enums/address';
import { countryPost, ICountryType } from '../enums/countries';
import { IFormInput } from '../interfaces/IFormInput';
import { ITextParams } from '../interfaces/ITextParams';

const validateCity = {
  required: `City is required`,
  pattern: {
    value: /^[a-zA-Z]+$/,
    message: `City must contain at least one letter`,
  },
};
const validateStreet = {
  required: `Street is required`,
  pattern: {
    value: /^\S(.*\S)?$/,
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
  const message = 'Invalid ZIP code format, the correct format is';
  let errorMessage: string | undefined;
  let pattern;
  switch (countryCode) {
    case 'Canada':
      pattern = /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/;
      errorMessage = pattern.test(value) ? undefined : `${message} "A1A 1A1" `;
      break;
    case 'United States':
      pattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
      errorMessage = pattern.test(value) ? undefined : `${message} "12345" or "12345-1234"`;
      break;
    case 'Germany':
      pattern = /^\d{5}$/;
      errorMessage = pattern.test(value) ? undefined : `${message} "12345" `;
      break;
    case 'France':
      pattern = /^\d{5}$/;
      errorMessage = pattern.test(value) ? undefined : `${message} "12345" `;
      break;
    default:
      errorMessage = "Didn't choose a country";
  }
  return errorMessage || true;
};

type Props = Omit<ITextParams, 'control'> & {
  control: Control<IFormInput, string>;
  watch: UseFormWatch<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  getValues: UseFormGetValues<IFormInput>;
};

function Address({ register, setValue, getValues, errors, control, watch }: Props) {
  const { setError, clearErrors, getFieldState } = useFormContext<IFormInput, string>();
  const [typeAddresses, setTypeAddresses] = useState([TypeAddress.SHIPPING]);

  const validateCountry = {
    required: 'Country is required',
  };

  const validateCountryOnSelect =
    (index: number) => (e: unknown, newValue: ICountryType | null | string) => {
      const nameCountryField = `addresses.${index}.country` as const;
      if (countryPost.find(({ label }) => label === newValue)) {
        clearErrors(nameCountryField);
        const namePostalCodeField = `addresses.${index}.postalCode` as const;
        const state = getFieldState(namePostalCodeField);
        const value = getValues(namePostalCodeField) || '';
        const message = validatePostalCode(newValue?.toString() || '', value);
        if ((state.isTouched || state.invalid) && typeof message === 'string') {
          setError(namePostalCodeField, {
            type: 'manual',
            message,
          });
        } else {
          clearErrors(namePostalCodeField);
        }
      } else {
        setError(nameCountryField, {
          type: 'manual',
          message: 'Country is required',
        });
      }
    };

  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
    control,
  });

  const handleAdd = (typeAddress: TypeAddress) => {
    const typeAddressObject =
      typeAddress === TypeAddress.SHIPPING ? { shippingAddress: true } : { billingAddress: true };
    setTypeAddresses((value) => [...value, typeAddress]);
    append({ country: '', ...typeAddressObject });
  };

  const handleRemove = (index: number) => {
    typeAddresses.splice(index, 1);
    remove(index);
  };

  return (
    <>
      {fields.map((field, index) => {
        const typeAddress = typeAddresses[index];
        return (
          <Stack key={field.id} spacing={1} className="m-10">
            {typeAddresses.length > 1 && (
              <Button onClick={() => handleRemove(index)}>remove address</Button>
            )}

            <div className="form-shipping-address">
              <Typography
                variant="h4"
                sx={{ fontSize: '22px', fontWeight: 'bold', color: 'inherit' }}
              >
                {typeAddress} address
              </Typography>

              <CheckBoxTypeAddress
                name={`addresses.${index}.shippingAddress`}
                hidden={typeAddresses[index] === TypeAddress.SHIPPING}
                interacts={DefNameAddress.SHIPPING}
                index={index}
                label="ShippingAddress"
              />

              <CheckBoxTypeAddress
                name={`addresses.${index}.billingAddress`}
                hidden={typeAddresses[index] === TypeAddress.BILLING}
                interacts={DefNameAddress.BILLING}
                index={index}
                label="Billing Address"
              />

              <Controller
                name={`addresses.${index}.defaultShippingAddress`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    label="Default shipping address"
                    control={
                      <Checkbox
                        checked={!!value}
                        value={value}
                        onChange={(e) => {
                          const addressType = 'shippingAddress' as const;
                          const { checked } = e.target;
                          if (checked) {
                            const values = getValues('addresses');
                            (typeAddresses[index] === TypeAddress.SHIPPING &&
                              values[index][addressType]) ||
                              setValue(`addresses.${index}.${addressType}`, true);
                            values.forEach(
                              (_, i) =>
                                i !== index &&
                                setValue(`addresses.${i}.defaultShippingAddress`, false)
                            );
                          }
                          onChange(checked);
                        }}
                      />
                    }
                  />
                )}
              />

              <Controller
                name={`addresses.${index}.defaultBillingAddress`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    label="Default billing address"
                    control={
                      <Checkbox
                        checked={!!value}
                        value={value}
                        onChange={(e) => {
                          const addressType = 'billingAddress' as const;
                          const { checked } = e.target;
                          if (checked) {
                            const values = getValues('addresses');
                            values[index][addressType] ||
                              setValue(`addresses.${index}.${addressType}`, true);
                            values.forEach(
                              (_, i) =>
                                checked &&
                                i !== index &&
                                setValue(`addresses.${i}.defaultBillingAddress`, false)
                            );
                          }
                          onChange(checked);
                        }}
                      />
                    }
                  />
                )}
              />
            </div>

            <Autocomplete
              className="dark:bg-white"
              options={countryPost}
              onInputChange={validateCountryOnSelect(index)}
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
                    autoComplete: 'new-password',
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
            />

            <div className="flex flex-nowrap gap-2">
              <TextField
                required
                id="outlined-required-streetnum"
                className="dark:bg-white"
                label="Street Number"
                type="text"
                {...register(`addresses.${index}.streetNumber`, validateStreetNumber)}
                error={!!errors!.addresses?.[index]?.streetNumber}
                helperText={errors!.addresses?.[index]?.streetNumber?.message}
                sx={{ width: '50%' }}
              />

              <TextField
                required
                id="outlined-required-postal"
                className="dark:bg-white"
                label="Post"
                type="string"
                {...register(`addresses.${index}.postalCode`, {
                  validate: (value) => {
                    const selectedCountry = watch(`addresses.${index}.country`);
                    const validationResult = validatePostalCode(selectedCountry, value as string);

                    return validationResult || 'Invalid ZIP code format';
                  },
                })}
                error={!!errors!.addresses?.[index]?.postalCode}
                helperText={errors!.addresses?.[index]?.postalCode?.message}
                sx={{ width: '50%' }}
              />
            </div>
          </Stack>
        );
      })}
      <Button variant="outlined" onClick={() => handleAdd(TypeAddress.BILLING)}>
        Add billing address
      </Button>
      <Button variant="outlined" onClick={() => handleAdd(TypeAddress.SHIPPING)}>
        Add shipping address
      </Button>
    </>
  );
}

export default Address;
