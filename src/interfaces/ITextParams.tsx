import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { IFormInput } from './IFormInput';

export interface ITextParams {
  register: UseFormRegister<IFormInput>;
  name: Parameters<UseFormRegister<IFormInput>>[0];
  label?:string; 
  disabled?: boolean;
  errors?: FieldErrors<IFormInput>;
  control?: Control<IFormInput, string>;
}
