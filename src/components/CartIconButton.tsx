import { Badge, Box, CircularProgress, IconButton, SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import GarageSVG from '@/src/components/GarageSVG';

const sx = (isAdd: boolean): SxProps<Theme> | undefined => ({
  position: 'relative',
  transform: `rotateZ(${isAdd ? 45 : 0}deg)`,
  transition: 'transform 0.3s linear',
});

type Props = {
  onClick: (type: 'add' | 'remove') => Promise<void>;
  className?: string;
  type?: 'add' | 'remove';
};

export default function CartIconButton({ className, type, onClick }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    await onClick(type!);
    setIsLoading(false);
  };

  const badgeContent = (
    <>
      {isLoading && (
        <CircularProgress size={24} sx={{ position: 'absolute', inset: '-6px -7px' }} />
      )}
      ✖
    </>
  );

  const disableColor = isLoading ? 'gray' : undefined;
  return (
    <IconButton className={className} onClick={handleClick} disabled={isLoading}>
      <Badge
        badgeContent={
          <Box className="relative" sx={sx(type === 'add')}>
            {badgeContent}
          </Box>
        }
        sx={{ '.MuiBadge-badge': { p: 0, bgcolor: disableColor } }}
        color={type === 'remove' ? 'error' : 'success'}
      >
        <GarageSVG fill={disableColor} />
      </Badge>
    </IconButton>
  );
}

CartIconButton.defaultProps = {
  className: undefined,
  type: 'add',
};
