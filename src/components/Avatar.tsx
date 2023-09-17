import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name?: string) {
  if (!name) {
    return;
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function LetterAvatar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={(theme) => ({
            p: 0,
            '&:hover': {
              bgcolor: 'white',
              '& path': { fill: theme.palette.primary.main },
            },
          })}
        >
          <Avatar {...stringAvatar()} sx={{ border: '2px solid white', bgcolor: 'transparent' }} />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography component={Link} href="/profile" textAlign="center">
            Profile
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            component={Link}
            href=""
            textAlign="center"
            onClick={async (e) => {
              e.preventDefault();
              await signOut();
            }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
