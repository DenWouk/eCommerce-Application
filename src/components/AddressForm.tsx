import { Button, Stack } from '@mui/material';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Customer } from '@commercetools/platform-sdk';
import ErrorMessage from '@/src/components/ErrorMessage';
import { IFormInput } from '../interfaces/IFormInput';
import updateProfile from '../api/updateProfile';
import { showSuccess } from '../helpers/toastify';
import Address from './Address';
import { IBaseAddressProfile } from '../interfaces/IBaseAddressProfile';

type Props = {
  addresses: IBaseAddressProfile[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  version: number;
  onUpdate: (customer: Customer) => void;
};

export default function AddressForm({
  addresses,
  shippingAddressIds,
  billingAddressIds,
  defaultShippingAddressId,
  defaultBillingAddressId,
  version,
  onUpdate,
}: Props) {
  const formAddresses = addresses.map((address) => {
    const { id, country, city, streetNumber, streetName, postalCode } = address;

    return {
      id,
      country,
      city,
      streetNumber,
      streetName,
      postalCode,
      shippingAddress: shippingAddressIds.includes(id as string),
      billingAddress: billingAddressIds.includes(id as string),
      defaultShippingAddress: defaultShippingAddressId === id,
      defaultBillingAddress: defaultBillingAddressId === id,
    };
  });
  const form = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      addresses: formAddresses,
    },
  });

  const {
    register,
    setError,
    clearErrors,
    control,
    watch,
    getValues,
    setValue,
    // reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const [isDisabled, setIsDisabled] = useState(true);

  const handleUpdateClick = async () => {
    setIsDisabled((prevIsDisabled) => !prevIsDisabled);
  };
  const handleCancelClick = async () => {
    // reset({
    //   addresses,
    //   version,
    // });
    setIsDisabled(true);
  };

  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput): Promise<void> => {
    try {
      const result = await updateProfile({ ...data, currentAddresses: formAddresses, version });

      clearErrors('root');

      if (result?.id) {
        onUpdate(result);
        await router.push('/profile');
        showSuccess('Successful update!');
        setIsDisabled(true);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError('root.server', {
          type: 'manual',
          message: e.message,
        } as FieldError);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form className="form-registration" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={1} className="m-5">
          {isDisabled ? (
            <Button
              endIcon={<EditNoteRoundedIcon />}
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: 1.2,
                textAlign: 'center',
                color: '#6195c3',
              }}
              onClick={handleUpdateClick}
            >
              Edit Your Address
            </Button>
          ) : (
            <Button
              endIcon={<CloseRoundedIcon />}
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: 1.2,
                textAlign: 'center',
                color: '#f44336',
              }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          )}

          <Address
            setValue={setValue}
            getValues={getValues}
            register={register}
            control={control}
            errors={errors}
            name="addresses"
            watch={watch}
            disabled={isDisabled}
          />

          {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}

          <Button type="submit" disabled={isDisabled}>
            Save Changes
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
