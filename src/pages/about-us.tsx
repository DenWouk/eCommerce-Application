import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, Container, Divider, Link, Paper, Typography } from '@mui/material';
import { ssrWithAuthToken } from '../helpers/next/withAuthToken';
import NamesClients from '../helpers/commercetools/consts';

export type Props = {
  authorized: boolean;
};

export default function AboutUsPage() {
  return (
    <Container
      className="welcome-page-container"
      sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <Paper className="welcome-page-content1">
        <Typography
          variant="h4"
          className="content-title"
          sx={{ mb: '10px', textDecoration: 'underline' }}
        >
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
            <br />
            - Registration and Authorization forms
            <br />
            - Shopping Cart
            <br />
            - Application styling
            <br />
            - Refactoring
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
              sx={{ width: 100, height: 100 }}
            />
          </Box>

          <Typography variant="h5" className="content-item-title">
            Kirill
          </Typography>
          <Typography variant="subtitle1" className="content-item-about-team">
            Participation in the project: <br />
            <br />
            - Integration with CommerceTools API (products, cart, authorization)
            <br />
            - Authentication for Next.js with next-auth
            <br />
            - UI components setting up and using Next.js features (SSR, middleware, Image etc.)
            <br />- Refactoring
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
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h5" className="content-item-title">
            Denis
          </Typography>
          <Typography variant="subtitle1" className="content-item-about-team">
            Participation in the project: <br />
            <br />
            - Header and Footer
            <br />
            - Main Page
            <br />
            - About us Page
            <br />
            - Cars Page and Car details (frontend)
            <br />
            - Content filling via CommerceTools
            <br />- Application styling
          </Typography>
        </Box>
      </Paper>

      <Paper className="welcome-page-content2">
        <Typography variant="h4" className="content-title" sx={{ textDecoration: 'underline' }}>
          About the app:
        </Typography>

        <Typography
          variant="subtitle1"
          className="content-item-description"
          sx={{ overflow: 'hidden' }}
        >
          <br />
          - The application was created on Next.js. <br />
          - Used Material UI library. <br />
          <br />- In this application we took content from the site
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

export const getServerSideProps = ssrWithAuthToken<Props>(async ({ token }) => {
  const authorized = token?.type === NamesClients.PASSWORD;
  return { props: { authorized } };
});
