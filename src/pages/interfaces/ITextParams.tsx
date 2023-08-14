import { Control, FieldErrors, FieldPathValues, UseFormRegister } from 'react-hook-form';
import { IFormInput } from './IFormInput';
import { AllowedNames } from '../types/types';

export interface ITextParams {
  register: UseFormRegister<IFormInput>;
  name: AllowedNames;
  errors?: FieldErrors<IFormInput>;
  control?: Control<IFormInput, string>;
  setValue?: any
}
