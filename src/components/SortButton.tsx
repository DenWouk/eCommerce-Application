import { Chip } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { useState } from 'react';

type Props = {
  targetSort: string;
  label: string;
  active: boolean;
  onClick: (targetSort: string) => void;
  isAscDefault: boolean;
};

export default function SortButton({ targetSort, label, onClick, isAscDefault, active }: Props) {
  const [isAsc, setIsAsc] = useState(isAscDefault);
  const handleClick = () => {
    setIsAsc((value) => !value);
    onClick(targetSort);
  };
  return (
    <Chip
      label={label}
      color={active ? 'primary' : 'default'}
      onClick={handleClick}
      onDelete={handleClick}
      deleteIcon={
        <SortIcon
          sx={{
            transform: `rotateZ(${isAsc ? 0 : 180}deg)`,
          }}
          style={active ? { color: 'white' } : undefined}
        />
      }
    />
  );
}
