import { Badge, IconButton } from '@mui/material';
import Link from 'next/link';
import { useContext } from 'react';
import GarageSVG from '@/src/components/GarageSVG';
import MyContext from '@/src/contexts/MyContext';

type Props = {
  className?: string;
  href: URL | string;
};

export default function CartIconLink({ className, href }: Props) {
  const { state } = useContext(MyContext);
  return (
    <IconButton
      component={Link}
      color="primary"
      className={className}
      sx={(theme) => ({
        '&:hover': {
          bgcolor: 'white',
          '& path': { fill: theme.palette.primary.main },
        },
      })}
      href={href}
    >
      <Badge
        badgeContent={state.countProductsInCart}
        sx={(theme) => ({
          '.MuiBadge-badge': {
            p: 0,
            bgcolor: theme.palette.primary.main,
            color: 'white',
            border: '2px solid white',
          },
        })}
      >
        <GarageSVG fill="white" />
      </Badge>
    </IconButton>
  );
}

CartIconLink.defaultProps = {
  className: undefined,
};
