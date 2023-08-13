import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import React, { ReactNode } from 'react';
import { Stack } from '@mui/material';
import { IFormInput } from '../pages/interfaces/IFormInput';

interface IFormProps<T> {
  defaultValues: T;
  children: ReactNode | ReactNode[];
  onSubmit: SubmitHandler<IFormInput>;
}
function Form<T extends FieldValues>({ defaultValues, children, onSubmit }: IFormProps<T>) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-10" noValidate>
      <Stack spacing={2} className="m-10" width={400}>
        {Array.isArray(children)
          ? children.map((child: any) =>
              child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register,
                      control,
                      errors,
                      key: child.props.name,
                    },
                  })
                : child
            )
          : children}
      </Stack>
    </form>
  );
}
export default Form;
