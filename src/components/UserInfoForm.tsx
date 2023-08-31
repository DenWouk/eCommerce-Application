import { Button, Stack } from '@mui/material';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ErrorMessage from '@/src/components/ErrorMessage';
import LoadingButton from '@/src/components/LoadingButton';
import { AuthProps } from '@/src/types/auth';
import isAuthorized from '@/src/helpers/auth';
import InputEmail from './InputEmail';
import { IFormInput } from '../interfaces/IFormInput';
import InputPassword from './InputPassword';
import InputFirstName from './InputFirstName';
import InputLastName from './InputLastName';
import InputDate from './InputDate';
import updateProfile from '../api/updateProfile';
import { showSuccess } from '../helpers/toastify';

type UserInfo = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  emailProp: string;
  version: number;
};
export default function UserInfoForm({
  firstName,
  lastName,
  dateOfBirth,
  emailProp,
  version,
}: UserInfo) {
  function convertDateFormat() {
    const [year, month, day] = dateOfBirth.split('-');
    return `${day}-${month}-${year}`;
  }
  const convertedDate = convertDateFormat();

  const form = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: emailProp,
      password: '',
      firstName,
      lastName,
      dateOfBirth: new Date(convertedDate),
      // addresses: [
      //   {
      //     country: '',
      //     city: '',
      //     streetName: '',
      //     streetNumber: '',
      //     postalCode: '',
      //     shippingAddress: true,
      //     billingAddress: false,
      //     defaultShippingAddress: false,
      //     defaultBillingAddress: false,
      //   },
      // ],
    },
  });

  const {
    register,
    setError,
    clearErrors,
    control,
    // watch,
    // getValues,
    // setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const [isDisabled, setIsDisabled] = useState(true);

  const handleUpdateClick = async () => {
    setIsDisabled((prevIsDisabled) => !prevIsDisabled);
  };

  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput): Promise<void> => {
    try {
      const result = await updateProfile({ ...data, version, form: 'generalInfo' });
      clearErrors('root');
      console.log(result, 'result after clear');

      if (result?.id) {
        router.replace('/profile');
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
            Edit Your Info
          </Button>

          <InputEmail register={register} errors={errors} name="email" disabled={isDisabled} />

          <InputPassword
            register={register}
            errors={errors}
            name="password"
            disabled={isDisabled}
          />

          {/* <InputPasswordConfirm register={register} errors={errors} name="passwordConfirm" disabled={isDisabled}/> */}

          <InputFirstName
            register={register}
            errors={errors}
            name="firstName"
            disabled={isDisabled}
          />

          <InputLastName
            register={register}
            errors={errors}
            name="lastName"
            disabled={isDisabled}
          />

          <InputDate
            register={register}
            control={control}
            errors={errors}
            name="dateOfBirth"
            disabled={isDisabled}
          />

          {/* <Address
            setValue={setValue}
            getValues={getValues}
            register={register}
            control={control}
            errors={errors}
            name="addresses"
            watch={watch}
          /> */}

          {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}

          <LoadingButton type="submit" isLoading={isSubmitting}>
            Update info
          </LoadingButton>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });
  return { props: { authorized } };
};
