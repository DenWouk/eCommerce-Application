import { Chip } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { useRef } from 'react';

type Props = {
  value: string | null;
  targetSort: string;
  label: string;
  onClick: (targetSort: string, order: 'asc' | 'desc') => void;
};

export default function SortButton({ value, targetSort, label, onClick }: Props) {
  const isAsc = value !== 'desc';
  const refIsAsc = useRef(isAsc);

  const handleClick = () => {
    onClick(targetSort, refIsAsc.current ? 'desc' : 'asc');
    refIsAsc.current = !refIsAsc.current;
  };

  return (
    <Chip
      label={label}
      color={value ? 'primary' : 'default'}
      onClick={handleClick}
      onDelete={handleClick}
      deleteIcon={
        <SortIcon
          sx={{
            transform: `rotateZ(${refIsAsc.current ? 180 : 0}deg)`,
          }}
          style={value ? { color: 'white' } : undefined}
        />
      }
    />
  );
}
