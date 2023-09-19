import React from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Cart, ClientResponse, ProductProjection } from '@commercetools/platform-sdk';
import PriceProduct from '@/src/components/price/PriceProduct';
import { ssrWithAuthToken } from '@/src/helpers/next/withAuthToken';
import NamesClients from '@/src/helpers/commercetools/consts';
import productModel from '@/src/helpers/commercetools/product';
import cartModel from '@/src/helpers/commercetools/cart';
import CartChangeCountItemsButton from '@/src/components/CartChangeCountItemsButton';
import { ssrWithAuthToken } from '../../helpers/next/withAuthToken';
import NamesClients from '../../helpers/commercetools/consts';
import productModel from '../../helpers/commercetools/product';

type Props = {
  productResponse: ClientResponse<ProductProjection>;
};

export default function BasicStack(props: Props) {
  const { productResponse } = props;
  const { id, key = '', name, description, masterVariant } = productResponse.body;
  const { price, attributes, images } = masterVariant;

  const imageGalleryItem =
    images?.map(({ url }) => ({
      original: url,
      thumbnail: url,
    })) || [];

  const styleSpan = { lineHeight: '2', color: 'grey' };

  const productData = (
    <Typography>
      <span style={styleSpan}>car ID: </span>
      {key} <br />
      {attributes && (
        <>
          <span style={styleSpan}>location: </span>
          {attributes[8]?.value} <br />
          <span style={styleSpan}>year: </span>
          {attributes[2]?.value} <br />
          <span style={styleSpan}>odometer: </span>
          {attributes[5]?.value} <br />
          <span style={styleSpan}>engine: </span>
          {attributes[9]?.value} <br />
          <span style={styleSpan}>gearbox: </span>
          {attributes[4]?.value[0].label} <br />
          <span style={styleSpan}>color: </span>
          {attributes[3]?.value[0].label} <br />
          <span style={styleSpan}>interior: </span>
          {attributes[10]?.value} <br />
        </>
      )}
    </Typography>
  );

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
                <Typography variant="h5">{name['en-US']}</Typography>
              </Box>

              <Box>
                <ImageGallery items={imageGalleryItem} />
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
                  <Typography variant="h5">{name['en-US']}</Typography>
                  <Divider />

                  <Typography
                    variant="h6"
                    sx={{ py: '10px', display: 'flex', gap: '4px', alignItems: 'center' }}
                  >
                    Price:
                    <PriceProduct price={price} />
                    <CartChangeCountItemsButton productId={id} />
                  </Typography>
                  <Divider />
                  {productData}
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
            <Typography variant="h5">{name['en-US']}</Typography>

            <Typography
              variant="h6"
              sx={{ py: '10px', display: 'flex', gap: '4px', alignItems: 'center' }}
            >
              Price:
              <PriceProduct price={price} />
              <CartChangeCountItemsButton productId={id} />
            </Typography>
            {productData}
          </Paper>

          <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '20px' }}>
            <Typography variant="h6">Vehicle Description:</Typography>
            <Typography>{description?.['en-US']}</Typography>
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

  let cart: Cart | null;
  try {
    cart = (await cartModel.getCart(req)).body;
  } catch {
    cart = null;
  }

  const authorized = token?.type === NamesClients.PASSWORD;
  try {
    const productResponse = await productModel.getProductById(req, id);
    return { props: { authorized, cart, productResponse } };
  } catch (e) {
    return { notFound: true };
  }
});
