import { Control, FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IFormInput } from './IFormInput';

export interface ITextParams {
  register: UseFormRegister<IFormInput>;
  watch?:UseFormWatch<IFormInput>;
  getValues?:UseFormGetValues<IFormInput>;
  name: Parameters<UseFormRegister<IFormInput>>[0];
  label?:string; 
  disabled?: boolean;
  errors?: FieldErrors<IFormInput>;
  control?: Control<IFormInput, string>;
}
