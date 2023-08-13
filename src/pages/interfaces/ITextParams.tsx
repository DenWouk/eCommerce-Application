import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { IFormInput } from './IFormInput';
import { AllowedNames } from '../types/types';

export interface ITextParams {
  register: UseFormRegister<IFormInput>;
  name: AllowedNames;
  errors?: FieldErrors<IFormInput>;
  control?: Control<IFormInput, string>;
}
