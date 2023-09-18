import React from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Link as LinkMui,
} from '@mui/material';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

function stringAvatar(name?: string) {
  if (!name) {
    return undefined;
  }

  return {
    children: name[0].toLocaleUpperCase(),
  };
}

export default function LetterAvatar() {
  const { data } = useSession();
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
              '.MuiAvatar-root': { color: theme.palette.primary.main },
            },
          })}
        >
          <Avatar
            {...stringAvatar(data?.user?.name || '')}
            sx={{ border: '2px solid white', bgcolor: 'transparent' }}
          />
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
          <LinkMui component={Link} underline="none" href="/profile" textAlign="center">
            Profile
          </LinkMui>
        </MenuItem>

        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            sx={(theme) => ({ color: theme.palette.primary.main })}
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
