import { Alert } from '@mui/material';

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return <Alert>{message}</Alert>;
}
