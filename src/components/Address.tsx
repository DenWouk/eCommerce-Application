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
import {
  Control,
  UseFormWatch,
  get,
  useFieldArray,
  UseFormSetValue,
  UseFormGetValues,
  useFormContext,
} from 'react-hook-form';
import { useState } from 'react';
import CheckBoxTypeAddress from '@/src/components/CheckboxTypeAddress';
import { countryPost, ICountryType } from '../enums/countries';
import { IFormInput } from '../interfaces/IFormInput';
import { ITextParams } from '../interfaces/ITextParams';

export const enum TypeAddress {
  BILLING = 'Billing',
  SHIPPING = 'Shipping',
}

export const enum NameAddress {
  BILLING = 'billing Address',
  SHIPPING = 'shipping Address',
}

export const enum DefNameAddress {
  BILLING = 'defaultBillingAddress',
  SHIPPING = 'defaultShippingAddress',
}

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
  let pattern;
  switch (countryCode) {
    case 'Canada':
      pattern = /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/;
      break;
    case 'United States':
      pattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
      break;
    case 'Germany':
      pattern = /^\d{5}$/;
      break;
    case 'France':
      pattern = /^\d{2}[ ]?\d{3}$/;
      break;
    default:
      return false;
  }
  return pattern.test(value);
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
        if (state.isTouched && !validatePostalCode(newValue?.toString() || '', value)) {
          setError(namePostalCodeField, {
            type: 'manual',
            message: 'Invalid ZIP code format',
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
    const bAddress = DefNameAddress.BILLING;
    const sAddress = DefNameAddress.SHIPPING;
    const defBilling = getValues(bAddress);
    const defShipping = getValues(sAddress);
    setTimeout(() => {
      defBilling === index + 1 && setValue(bAddress, 5);
      defShipping === index + 1 && setValue(sAddress, 5);
    }, 100);

    defBilling === index && setValue(bAddress, null);
    defShipping === index && setValue(sAddress, null);

    typeAddresses.splice(index, 1);
    remove(index);
  };

  return (
    <>
      {fields.map((field, index) => {
        const typeAddress = typeAddresses[index];
        return (
          <Stack key={field.id} spacing={1} className="m-10">
            <div className="form-shipping-adress">
              <Typography
                variant="h4"
                sx={{ fontSize: '22px', fontWeight: 'bold', color: 'inherit' }}
              >
                {typeAddress} address
              </Typography>

              <CheckBoxTypeAddress
                name={`addresses.${index}.shippingAddress`}
                hidden={typeAddresses[index] === TypeAddress.SHIPPING}
                label="ShippingAddress"
                register={register}
              />

              <CheckBoxTypeAddress
                name={`addresses.${index}.billingAddress`}
                hidden={typeAddresses[index] === TypeAddress.BILLING}
                label="Billing Address"
                register={register}
              />

              <FormControlLabel
                label="Default Shipping Address"
                control={
                  <input
                    type="radio"
                    className="input-radio"
                    {...register(`defaultShippingAddress`)}
                    value={index}
                  />
                }
              />

              <FormControlLabel
                label="Default Billing Address"
                control={
                  <input
                    type="radio"
                    className="input-radio"
                    {...register(`defaultBillingAddress`)}
                    value={index}
                  />
                }
              />
            </div>

            {typeAddresses.length > 1 && (
              <Button onClick={() => handleRemove(index)}>remove address</Button>
            )}

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
