import React, { memo } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
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
  Link as LinkMui,
} from '@mui/material';
import LoadingPage from '@/src/components/LoadingPage';
import CartIconLink from '@/src/components/CartIconLink';
import LetterAvatar from './Avatar';

type Props = {
  authorized: boolean | undefined;
};

function Header({ authorized }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
            <LinkMui color="inherit" underline="hover" component={Link} href="/">
              Classic Cars
            </LinkMui>
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
              <LinkMui component={Link} underline="hover" href="/">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Main</Typography>
                </MenuItem>
              </LinkMui>

              <LinkMui component={Link} underline="hover" href="/products">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Cars</Typography>
                </MenuItem>
              </LinkMui>

              <LinkMui component={Link} underline="hover" href="/about-us">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">About us</Typography>
                </MenuItem>
              </LinkMui>
            </Menu>
          </Box>

          <Typography
            variant="h6"
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
            <LinkMui component={Link} underline="hover" href="/">
              Classic Cars
            </LinkMui>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              alignItems: 'center',
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            <LinkMui
              onClick={handleCloseNavMenu}
              color="inherit"
              component={Link}
              underline="hover"
              href="/"
            >
              MAIN
            </LinkMui>

            <LinkMui
              onClick={handleCloseNavMenu}
              color="inherit"
              component={Link}
              underline="hover"
              href="/products"
            >
              CARS
            </LinkMui>

            <LinkMui
              onClick={handleCloseNavMenu}
              color="inherit"
              component={Link}
              underline="hover"
              href="/about-us"
            >
              ABOUT US
            </LinkMui>
          </Box>

          <CartIconLink href="/cart" className="mx-2" />

          {authorized ? (
            <LetterAvatar />
          ) : (
            <>
              <Button
                component={Link}
                variant="contained"
                href="/sign-in"
                sx={{
                  width: '80px',
                  ml: '20px',
                  mr: '5px',
                  fontSize: '10px',
                }}
              >
                Sign in
              </Button>

              <Button
                component={Link}
                variant="contained"
                href="/sign-up"
                sx={{ width: '80px', mr: '5px', fontSize: '10px' }}
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
