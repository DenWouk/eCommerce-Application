import React from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';
import { ssrWithAuthToken } from '../../helpers/next/withAuthToken';
import NamesClients from '../../helpers/commercetools/consts';
import productModel from '../../helpers/commercetools/product';

type Props = {
  productResponse: ClientResponse<ProductProjection>;
};

export default function BasicStack(props: Props) {
  const { productResponse } = props;
  const product = productResponse?.body;

  const images = [
    {
      original: `${product?.masterVariant.images?.[0]?.url}`,
      thumbnail: `${product?.masterVariant.images?.[0]?.url}`,
    },
    {
      original: `${product?.masterVariant.images?.[1]?.url}`,
      thumbnail: `${product?.masterVariant.images?.[1]?.url}`,
    },
    {
      original: `${product?.masterVariant.images?.[2]?.url}`,
      thumbnail: `${product?.masterVariant.images?.[2]?.url}`,
    },
    {
      original: `${product?.masterVariant.images?.[3]?.url}`,
      thumbnail: `${product?.masterVariant.images?.[3]?.url}`,
    },
    {
      original: `${product?.masterVariant.images?.[4]?.url}`,
      thumbnail: `${product?.masterVariant.images?.[4]?.url}`,
    },
  ];

  const styleSpan = { lineHeight: '2', color: 'grey' };

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
                <Typography variant="h5">{product?.name['en-US']}</Typography>
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
                  <Typography variant="h5">{product?.name['en-US']}</Typography>
                  <Divider />

                  <Typography variant="h6" sx={{ pt: '10px', pb: '10px' }}>
                    {`Price: $${
                      (product.masterVariant.prices?.[0].value.centAmount as number) / 100
                    }`}
                  </Typography>
                  <Divider />

                  <Typography>
                    <span style={styleSpan}>car ID: </span>
                    {product.key} <br />
                    <span style={styleSpan}>location: </span>
                    {product.masterVariant.attributes?.[8].value} <br />
                    <span style={styleSpan}>year: </span>
                    {product.masterVariant.attributes?.[2].value} <br />
                    <span style={styleSpan}>engine: </span>
                    {product.masterVariant.attributes?.[9].value} <br />
                    <span style={styleSpan}>gearbox: </span>
                    <span style={styleSpan}>odometer: </span>
                    {product.masterVariant.attributes?.[5].value} <br />
                    {product.masterVariant.attributes?.[4].value[0].label} <br />
                    <span style={styleSpan}>color: </span>
                    {product.masterVariant.attributes?.[3].value[0].label} <br />
                    <span style={styleSpan}>interior: </span>
                    {product.masterVariant.attributes?.[10].value} <br />
                  </Typography>
                  <Divider />
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
            <Typography variant="h5">{product?.name['en-US']}</Typography>

            <Typography variant="h6" sx={{ pt: '10px', pb: '10px' }}>
              {`Price: ${product.masterVariant.attributes?.[6].value}`}
            </Typography>

            <Typography>
              <span style={styleSpan}>car ID: </span>
              {product.key} <br />
              <span style={styleSpan}>location: </span>
              {product.masterVariant.attributes?.[8].value} <br />
              <span style={styleSpan}>year: </span>
              {product.masterVariant.attributes?.[2].value} <br />
              <span style={styleSpan}>odometer: </span>
              {product.masterVariant.attributes?.[5].value} <br />
              <span style={styleSpan}>engine: </span>
              {product.masterVariant.attributes?.[9].value} <br />
              <span style={styleSpan}>gearbox: </span>
              {product.masterVariant.attributes?.[4].value[0].label} <br />
              <span style={styleSpan}>color: </span>
              {product.masterVariant.attributes?.[3].value[0].label} <br />
              <span style={styleSpan}>interior: </span>
              {product.masterVariant.attributes?.[10].value} <br />
            </Typography>
          </Paper>

          <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '20px' }}>
            <Typography variant="h6">Vehicle Description:</Typography>
            <Typography>{product.description?.['en-US']}</Typography>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
}

export const getServerSideProps = ssrWithAuthToken<
  Props & { authorized: boolean },
  { id?: string }
>(async (context) => {
  const { req, params, token } = context;
  const { id } = params || {};

  if (!id) {
    return { notFound: true };
  }

  const authorized = token?.type === NamesClients.PASSWORD;
  try {
    const productResponse = await productModel.getProductById(req, id);

    return { props: { authorized, productResponse } };
  } catch (e) {
    return { notFound: true };
  }
});
