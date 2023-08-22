import React from 'react';
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
} from '@mui/material';

export default function Header() {
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
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: 'unset',
              color: 'inherit',
            }}
          >
            <Link href="/"> eCommerce-App</Link>
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
              fontWeight: 700,
              letterSpacing: 'unset',
              color: 'inherit',
            }}
          >
            <Link href="/"> eCommerce-App </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
