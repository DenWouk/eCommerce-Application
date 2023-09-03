import { Button, Stack } from '@mui/material';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ErrorMessage from '@/src/components/ErrorMessage';
import { AuthProps } from '@/src/types/auth';
import isAuthorized from '@/src/helpers/auth';
import InputEmail from './InputEmail';
import { IFormInput } from '../interfaces/IFormInput';
import InputFirstName from './InputFirstName';
import InputLastName from './InputLastName';
import InputDate from './InputDate';
import updateProfile from '../api/updateProfile';
import { showSuccess } from '../helpers/toastify';
import formatDate, { convertFormatDate } from '../helpers/date';

type UserInfo = {
  firstName: string;
  lastName: string;
  dateOfBirth: string | Date;
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
  const form = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: emailProp,
      firstName,
      lastName,
      dateOfBirth: new Date(convertFormatDate(dateOfBirth as string)),
    },
  });

  const {
    register,
    setError,
    clearErrors,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const [isDisabled, setIsDisabled] = useState(true);

  const handleUpdateClick = async () => {
    setIsDisabled((prevIsDisabled) => !prevIsDisabled);
  };

  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput): Promise<void> => {
    try {
      const dateOfBirthModified = formatDate(data.dateOfBirth as Date);
      const result = await updateProfile({
        ...data,
        dateOfBirth: dateOfBirthModified as string,
        version,
        form: 'generalInfo',
      });
      clearErrors('root');

      if (result?.id) {
        router.push('/profile');
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

          {/* <InputPassword
            register={register}
            errors={errors}
            name="password"
            disabled={isDisabled}
          /> */}

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

          {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}

          <Button type="submit" disabled={isDisabled}>
            Save Changes
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const authorized = await isAuthorized({ req });
  return { props: { authorized } };
};
