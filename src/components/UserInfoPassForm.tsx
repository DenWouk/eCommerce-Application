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
import { IFormInput } from '../interfaces/IFormInput';
import updateProfile from '../api/updateProfile';
import { showSuccess } from '../helpers/toastify';
import InputPasswordConfirm from './InputPasswordConfirm';
import InputPassword from './InputPassword';

type UserInfo = {
  password: string;
  version: number;
};
export default function UserInfoPassForm({
  password,
  version,
}: UserInfo) {

  const form = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      password,
      },
  });

  const {
    register,
    setError,
    clearErrors,
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
      // const dateOfBirthModified = formatDate(data.dateOfBirth as Date)
      const result = await updateProfile({ ...data, password: password as string, version, form: 'generalInfo' });
      clearErrors('root');
      console.log(data, 'data after clear');

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
            Edit Your PassWord
          </Button>

          <InputPassword
            register={register}
            errors={errors}
            name="password"
            disabled={isDisabled}
          />

          <InputPasswordConfirm register={register} errors={errors} name="passwordConfirm" disabled={isDisabled}/>

          {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}

          <Button type="submit" disabled={isDisabled}>
            Confirm Changes
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
