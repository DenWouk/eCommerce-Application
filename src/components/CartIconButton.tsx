import { Badge, CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';
import GarageSVG from '@/src/components/GarageSVG';

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
  const typeBadgeContent = type === 'add' ? <>✚</> : <>✖</>;
  const badgeContent = isLoading ? (
    <div className="relative">
      <CircularProgress size={24} sx={{ position: 'absolute', inset: '-6px -7px' }} />
      <div>{typeBadgeContent}</div>
    </div>
  ) : (
    <div className="relative">{typeBadgeContent}</div>
  );
  const disableColor = isLoading ? 'gray' : undefined;
  return (
    <IconButton className={className} onClick={handleClick} disabled={isLoading}>
      <Badge
        badgeContent={badgeContent}
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
