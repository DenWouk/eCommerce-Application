import { Badge, IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import GarageSVG from '@/src/components/GarageSVG';
import MyContext from '@/src/contexts/MyContext';
import { getCarts } from '@/src/api/carts';

type Props = {
  className?: string;
  href: URL | string;
};

export default function CartIconLink({ className, href }: Props) {
  const { state, dispatch } = useContext(MyContext);
  const { data } = useSWR(state.cart || '/api/carts', getCarts);

  useEffect(() => {
    data && dispatch({ type: 'CHANGE', value: data });
  }, [data, dispatch]);

  return (
    <Tooltip title="Shopping cart">
      <IconButton
        component={Link}
        color="primary"
        className={className}
        sx={(theme) => ({
          width: '40px',
          height: '40px',
          border: '2px solid white',
          '&:hover': {
            bgcolor: 'white',
            '& path': { fill: theme.palette.primary.main },
          },
        })}
        href={href}
      >
        <Badge
          badgeContent={state.countProductsInCart}
          sx={{
            '.MuiBadge-badge': {
              p: 0,
              bgcolor: '#CE5959',
              color: 'white',
              border: '2px solid white',
            },
          }}
        >
          <GarageSVG fill="white" />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

CartIconLink.defaultProps = {
  className: undefined,
};
