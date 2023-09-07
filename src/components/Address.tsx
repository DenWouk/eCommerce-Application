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
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckBoxTypeAddress from '@/src/components/CheckboxTypeAddress';
import { DefNameAddress, TypeAddress } from '@/src/enums/address';
import { countryPost, ICountryType } from '../enums/countries';
import { IFormInput } from '../interfaces/IFormInput';
import { ITextParams } from '../interfaces/ITextParams';
import {
  validateCity,
  validateStreet,
  validateStreetNumber,
  validatePostalCode,
} from '../helpers/addressValidators';

type Props = Omit<ITextParams, 'control'> & {
  control: Control<IFormInput, string>;
  watch: UseFormWatch<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  getValues: UseFormGetValues<IFormInput>;
};

function Address({ register, setValue, getValues, errors, control, disabled }: Props) {
  const { setError, clearErrors, getFieldState } = useFormContext<IFormInput, string>();
  const [typeAddresses, setTypeAddresses] = useState([TypeAddress.SHIPPING]);

  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
    control,
  });

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
        const countryDefault = countryPost.find((c) => c.code === field.country) || {
          code: '',
          label: '',
          phone: '',
          suggested: true,
        };
        return (
          <Stack key={field.id} spacing={1} className="m-10">
            <div className="form-shipping-address">
              {(typeAddresses.length > 1 || fields.length > 1) && (
                <Button
                  endIcon={<CloseRoundedIcon />}
                  disabled={disabled}
                  onClick={() => handleRemove(index)}
                  sx={{
                    display: 'flex',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#f44336',
                  }}
                >
                  remove address
                </Button>
              )}
              <Typography
                variant="h4"
                sx={{ fontSize: '22px', fontWeight: 'bold', color: 'inherit' }}
              >
                {typeAddress} Address #{index + 1}
              </Typography>

              <CheckBoxTypeAddress
                name={`addresses.${index}.shippingAddress`}
                disabled={disabled}
                hidden={false}
                // hidden={typeAddresses[index] === TypeAddress.SHIPPING}
                interacts={DefNameAddress.SHIPPING}
                index={index}
                label="Shipping Address"
              />

              <CheckBoxTypeAddress
                name={`addresses.${index}.billingAddress`}
                disabled={disabled}
                // hidden={typeAddresses[index] === TypeAddress.BILLING}
                hidden={false}
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
                    disabled={disabled}
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
                              values![index][addressType]) ||
                              setValue(`addresses.${index}.${addressType}`, true);
                            values!.forEach(
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
                    disabled={disabled}
                    control={
                      <Checkbox
                        checked={!!value}
                        disabled={disabled}
                        value={value}
                        onChange={(e) => {
                          const addressType = 'billingAddress' as const;
                          const { checked } = e.target;
                          if (checked) {
                            const values = getValues('addresses');

                            values![index][addressType] ||
                              setValue(`addresses.${index}.${addressType}`, true);
                            values!.forEach(
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
              disabled={disabled}
              options={countryPost}
              onInputChange={validateCountryOnSelect(index)}
              autoHighlight
              isOptionEqualToValue={(option, value) => option.code === value.code}
              getOptionLabel={(option) => option.label}
              defaultValue={countryDefault}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <Image
                    loading="lazy"
                    width="20"
                    height="20"
                    className="w-a"
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
                  disabled={disabled}
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
              disabled={disabled}
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
              disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
                id="outlined-required-postal"
                className="dark:bg-white"
                label="Post"
                type="string"
                {...register(`addresses.${index}.postalCode`, {
                  validate: (value) => {
                    const selectedCountry = getValues(`addresses.${index}.country`);
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
      <Button variant="outlined" onClick={() => handleAdd(TypeAddress.BILLING)} disabled={disabled}>
        Add billing address
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleAdd(TypeAddress.SHIPPING)}
        disabled={disabled}
      >
        Add shipping address
      </Button>
    </>
  );
}

export default Address;
