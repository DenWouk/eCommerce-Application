import { Button, Stack } from '@mui/material';
import { FieldError, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { signIn } from 'next-auth/react';
import ErrorMessage from '@/src/components/ErrorMessage';
import NamesClients from '@/src/helpers/commercetools/consts';
import { IFormInput } from '../interfaces/IFormInput';
import { showSuccess } from '../helpers/toastify';
import InputPassword from './InputPassword';
import InputPasswordConfirm from './InputPasswordConfirm';
import updatePassword from '../api/updatePassword';

type UserInfo = {
  password: string;
  version: number;
  email: string;
};
export default function UserInfoPassForm({ email, version }: UserInfo) {
  const form = useForm<IFormInput>({
    mode: 'onChange',
  });

  const {
    register,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = form;

  const [isDisabled, setIsDisabled] = useState(true);

  const handleUpdateClick = async () => {
    setIsDisabled((prevIsDisabled) => !prevIsDisabled);
  };
  const handleCancelClick = async () => {
    reset({
      passwordOld: "",
      password: "",
      passwordConfirm: ""
    })
    setIsDisabled(true);
  };

  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput): Promise<void> => {
    try {
      const result = await updatePassword({
        ...data,
        version,
      });

      await signIn(NamesClients.PASSWORD, {
        username: email,
        password: data.password,
        redirect: false,
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
          {isDisabled ? <Button
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
          </Button> : <Button
            
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
          </Button>}

          <InputPassword
            register={register}
            errors={errors}
            name="passwordOld"
            label="Old Password"
            disabled={isDisabled}
          />
          <InputPassword
            register={register}
            errors={errors}
            watch={watch}
            name="password"
            label="New Password"
            disabled={isDisabled}
          />
          <InputPasswordConfirm
            register={register}
            errors={errors}
            watch={watch}
            getValues={getValues}
            label="Confirm Password"
            disabled={isDisabled}
            name="passwordConfirm"
          />
          {errors?.root?.server && <ErrorMessage message={errors.root.server.message || ''} />}

          <Button type="submit" disabled={isDisabled}>
            Confirm Changes
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
