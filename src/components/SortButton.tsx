import { Chip } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { useRef, useState } from 'react';

type Props = {
  targetSort: string;
  label: string;
  active: boolean;
  onClick: (targetSort: string) => void;
  isAscDefault: boolean;
};

export default function SortButton({ targetSort, label, onClick, isAscDefault, active }: Props) {
  const [isAsc, setIsAsc] = useState(isAscDefault);
  const isNotFirstClick = useRef(false);
  const handleClick = () => {
    isNotFirstClick && setIsAsc((value) => !value);
    isNotFirstClick.current = true;
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
            transform: `rotateZ(${isAsc ? 180 : 0}deg)`,
          }}
          style={active ? { color: 'white' } : undefined}
        />
      }
    />
  );
}
