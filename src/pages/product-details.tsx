import React from 'react';
import { Box, Container, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { ssrWithAuthToken } from '../helpers/next/withAuthToken';
import NamesClients from '../helpers/commercetools/consts';
import productModel from '../helpers/commercetools/product';

type Props = {
  productsResponse: ClientResponse<ProductProjectionPagedQueryResponse>;
};

export default function BasicStack(props: Props) {
  const { productsResponse } = props;
  const products = productsResponse?.body?.results;

  const images = [
    {
      original: `${products[0]?.masterVariant.images?.[0]?.url}`,
      thumbnail: `${products[0]?.masterVariant.images?.[0]?.url}`,
    },
    {
      original: `${products[0]?.masterVariant.images?.[1]?.url}`,
      thumbnail: `${products[0]?.masterVariant.images?.[1]?.url}`,
    },
    {
      original: `${products[0]?.masterVariant.images?.[2]?.url}`,
      thumbnail: `${products[0]?.masterVariant.images?.[2]?.url}`,
    },
    {
      original: `${products[0]?.masterVariant.images?.[3]?.url}`,
      thumbnail: `${products[0]?.masterVariant.images?.[3]?.url}`,
    },
    {
      original: `${products[0]?.masterVariant.images?.[4]?.url}`,
      thumbnail: `${products[0]?.masterVariant.images?.[4]?.url}`,
    },
  ];

  const styleSpan = { fontSize: '16px', color: 'grey' };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', gap: '35px', flex: '1 1 auto' }}>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2} sx={{ height: '100%' }}>
          <Paper>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: '30px',
                p: '15px',
              }}
            >
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5">{products[0]?.name['en-US']}</Typography>
              </Box>

              <Box>
                <ImageGallery items={images} />
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: '30%',
                }}
              >
                <Box>
                  <Typography variant="h5">{products[0]?.name['en-US']}</Typography>

                  <Typography variant="h6" sx={{ pt: '10px', pb: '10px' }}>
                    {`Price: ${products[0].masterVariant.attributes?.[6].value}`}
                  </Typography>

                  <Typography>
                    <span style={styleSpan}>car ID: </span>
                    {products[0].key} <br />
                    <span style={styleSpan}>location: </span>
                    {products[0].masterVariant.attributes?.[8].value} <br />
                    <span style={styleSpan}>year: </span>
                    {products[0].masterVariant.attributes?.[2].value} <br />
                    <span style={styleSpan}>odometer: </span>
                    {products[0].masterVariant.attributes?.[5].value} <br />
                    <span style={styleSpan}>engine: </span>
                    {products[0].masterVariant.attributes?.[9].value} <br />
                    <span style={styleSpan}>gearbox: </span>
                    {products[0].masterVariant.attributes?.[4].value[0].label} <br />
                    <span style={styleSpan}>color: </span>
                    {products[0].masterVariant.attributes?.[3].value[0].label} <br />
                    <span style={styleSpan}>interior: </span>
                    {products[0].masterVariant.attributes?.[10].value} <br />
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>

          <Paper
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              p: '20px',
            }}
          >
            <Typography variant="h5">{products[0]?.name['en-US']}</Typography>

            <Typography variant="h6" sx={{ pt: '10px', pb: '10px' }}>
              {`Price: ${products[0].masterVariant.attributes?.[6].value}`}
            </Typography>

            <Typography>
              <span style={styleSpan}>car ID: </span>
              {products[0].key} <br />
              <span style={styleSpan}>location: </span>
              {products[0].masterVariant.attributes?.[8].value} <br />
              <span style={styleSpan}>year: </span>
              {products[0].masterVariant.attributes?.[2].value} <br />
              <span style={styleSpan}>odometer: </span>
              {products[0].masterVariant.attributes?.[5].value} <br />
              <span style={styleSpan}>engine: </span>
              {products[0].masterVariant.attributes?.[9].value} <br />
              <span style={styleSpan}>gearbox: </span>
              {products[0].masterVariant.attributes?.[4].value[0].label} <br />
              <span style={styleSpan}>color: </span>
              {products[0].masterVariant.attributes?.[3].value[0].label} <br />
              <span style={styleSpan}>interior: </span>
              {products[0].masterVariant.attributes?.[10].value} <br />
            </Typography>
          </Paper>

          <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '20px' }}>
            <Typography variant="h6">Vehicle Description:</Typography>
            <Typography>{products[0].description?.['en-US']}</Typography>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
}

export const getServerSideProps = ssrWithAuthToken<Props & { authorized: boolean }>(
  async ({ req, token }) => {
    const authorized = token?.type === NamesClients.PASSWORD;
    const productsResponse = await productModel.getProducts(req);

    return { props: { authorized, productsResponse } };
  }
);
