import React, { memo } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  Link as LinkMui,
} from '@mui/material';
import RSSicon from '../icons/rss-icon';
import GhSvg from '../icons/gh-icon';

const authors = ['Tanya', 'Kirill', 'Denis'];
const authorsLinks = [
  'https://github.com/tetlisna',
  'https://github.com/zakalupali89',
  'https://github.com/DenWouk',
];

function Footer() {
  return (
    <AppBar component="footer" position="static" className="footer">
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30px' }}
      >
        <Typography
          variant="subtitle1"
          noWrap
          component="span"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontSize: 'inherit',
            fontWeight: 700,
            letterSpacing: 'unset',
            color: 'inherit',
          }}
        >
          ©2023
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>
          {authors.map((author, i) => (
            <LinkMui
              color="inherit"
              underline="hover"
              key={author}
              rel="noopener noreferrer"
              href={authorsLinks[i]}
              target="_blank"
            >
              <Button sx={{ color: 'inherit', display: 'block', p: '0 5px' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '3px',
                    fontFamily: 'monospace',
                    fontSize: 'inherit',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                    textTransform: 'none',
                  }}
                >
                  {GhSvg()}
                  {author}
                </Typography>
              </Button>
            </LinkMui>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <a href="https://rs.school/js/" rel="noopener noreferrer" target="_blank">
            <IconButton
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                ml: 1,
                p: 0,
                verticalAlign: 'unset',
                borderRadius: 0,
              }}
            >
              <svg className="rss-logo " viewBox="0 0 552.8 205.3">
                {RSSicon()}
              </svg>
            </IconButton>
          </a>
        </Box>
      </Container>
    </AppBar>
  );
}

export default memo(Footer);
