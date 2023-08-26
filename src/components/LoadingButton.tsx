import { Button, CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  className?: string;
  isLoading: boolean;
  type?: 'submit' | 'reset' | 'button';
};
export default function LoadingButton({ className, isLoading, children, type }: Props) {
  return (
    <Button className={`registration-btn ${className}`} disabled={isLoading} type={type}>
      {isLoading && (
        <CircularProgress
          size="1.5rem"
          sx={{
            color: '#91ef95',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
      {children}
    </Button>
  );
}

LoadingButton.defaultProps = {
  type: 'button',
  className: undefined,
};
