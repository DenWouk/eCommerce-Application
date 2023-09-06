import { Chip } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { useState } from 'react';

type Props = {
  targetSort: string;
  label: string;
  active: boolean;
  onClick: (targetSort: string, order: 'asc' | 'desc') => void;
  order: string | undefined;
};

export default function SortButton({ targetSort, label, onClick, order, active }: Props) {
  const isAscDefault = active && order === 'asc';
  const [isAsc, setIsAsc] = useState(isAscDefault);

  const handleClick = () => {
    setIsAsc((value) => !value);
    onClick(targetSort, !isAsc ? 'asc' : 'desc');
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
            transform: `rotateZ(${isAsc ? 180 : 0}deg)`,
          }}
          style={active ? { color: 'white' } : undefined}
        />
      }
    />
  );
}
