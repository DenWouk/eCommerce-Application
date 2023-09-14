import React, { memo } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import LoadingPage from '@/src/components/LoadingPage';
import LetterAvatar from './Avatar';
import { useCartContext } from '../context/CartContext';

type Props = {
  authorized: boolean | undefined;
};

function Header({ authorized }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const { openCart, cartQuantity } = useCartContext();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handlerCartOpen = () => {
  //   console.log('click basket');
  // };

  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: 'unset',
              color: 'inherit',
            }}
          >
            <Link href="/">Classic Cars</Link>
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link href="/">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Main</Typography>
                </MenuItem>
              </Link>

              <Link href="/products">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Products</Typography>
                </MenuItem>
              </Link>

              <Link href="/contacts">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Contacts</Typography>
                </MenuItem>
              </Link>

              <Link href="/profile">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              fontFamily: 'monospace',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: 'unset',
              color: 'inherit',
            }}
          >
            <Link href="/">Classic Cars</Link>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            <Link href="/">
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                Main
              </Button>
            </Link>

            <Link href="/products">
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                Products
              </Button>
            </Link>

            <Link href="/contacts">
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                Contacts
              </Button>
            </Link>
          </Box>
          <IconButton onClick={openCart} aria-label="cart" size="large">
            <ShoppingCartRoundedIcon
              sx={{
                mr: '1rem',
                color: 'white',
                display: 'flex',
                poosition: 'relative',
              }}
            />
            {cartQuantity > 0 && ( 
            <Box
              sx={{
                color: 'white',
                bgcolor: 'rgba(255, 0, 0, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '1rem',
                height: '1rem',
                fontSize: '0.8rem',
                borderRadius: '50%',
                position: 'absolute',
                transform: 'translateX(-25%, -25%)',
                left: '1.6rem',
                bottom: '0',
              }}
            />)} 
          </IconButton>
          {authorized ? (
            <LetterAvatar />
          ) : (
            <>
              <Button
                component={Link}
                variant="contained"
                href="/sign-in"
                sx={{ width: '80px', mr: '5px', fontSize: '10px', background: '#6195c3fe' }}
              >
                Sign in
              </Button>

              <Button
                component={Link}
                variant="contained"
                href="/sign-up"
                sx={{ width: '80px', mr: '5px', fontSize: '10px', background: '#6195c3fe' }}
              >
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
        <LoadingPage />
      </Container>
    </AppBar>
  );
}

export default memo(Header);
