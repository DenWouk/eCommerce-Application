import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, Container, Divider, Link, Paper, Typography } from '@mui/material';

export default function AboutUsPage() {
  return (
    <Container
      className="welcome-page-container"
      sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <Paper className="welcome-page-content1">
        <Typography variant="h4" className="content-title">
          About the team:
        </Typography>

        <Box className="content-item">
          <Avatar
            className="content-item-img"
            src="../Tanya.jpg"
            alt="Avatar img"
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h5" className="content-item-title">
            Tanya
          </Typography>
          <Typography variant="subtitle1" className="content-item-about-team">
            Participation in the project: <br />
            -
            <br />
            -
            <br />
            -
            <br />
            -
            <br />
            -
            <br />
          </Typography>
        </Box>

        <Box>
          <Divider variant="fullWidth" orientation="vertical" />
        </Box>

        <Box className="content-item">
          <Box sx={{ width: 100, height: 100 }}>
            <Avatar
              className="content-item-img"
              src="../Kirill.png"
              alt="Avatar img"
              sx={{ width: 100, height: 100, minHeight: '100%' }}
            />
          </Box>

          <Typography variant="h5" className="content-item-title">
            Kirill
          </Typography>
          <Typography variant="subtitle1" className="content-item-about-team">
            Participation in the project: <br />
            - integration with commercetools API (products, cart, authorization)
            <br />
            - authentication for Next.js with next-auth
            <br />
            - UI components setting up and using Next JS features (SSR, middleware, Image etc.)
            <br />- refactoring
          </Typography>
        </Box>

        <Box>
          <Divider variant="fullWidth" orientation="vertical" />
        </Box>

        <Box className="content-item">
          <Avatar
            className="content-item-img"
            src="../Denis.jpg"
            alt="Avatar img"
            sx={{ width: 110, height: 110 }}
          />
          <Typography variant="h5" className="content-item-title">
            Denis
          </Typography>
          <Typography variant="subtitle1" className="content-item-about-team">
            Participation in the project: <br />
            - Header and Footer
            <br />
            - Main Page
            <br />
            -
            <br />
            -
            <br />
            -
            <br />
          </Typography>
        </Box>
      </Paper>

      <Paper className="welcome-page-content2">
        <Typography variant="h4" className="content-title">
          About the app:
        </Typography>

        <Typography variant="subtitle1" className="content-item-description">
          In this application we used content from the site
          <Link href="https://classiccars.com" rel="noopener noreferrer" target="_blank">
            &nbsp;https://classiccars.com&nbsp;
          </Link>
          . These are real cars with descriptions and prices and were offered for sale at the time
          the application was created. Enjoy the shopping!
        </Typography>
      </Paper>
    </Container>
  );
}
