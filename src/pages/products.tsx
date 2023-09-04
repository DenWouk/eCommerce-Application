import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { ssrWithAuthToken } from '../helpers/next/withAuthToken';
import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import NamesClients from '../helpers/commercetools/consts';
import productModel from '../helpers/commercetools/product';
import Link from 'next/link';

type Props = {
  productsResponse: ClientResponse<ProductProjectionPagedQueryResponse>;
};

export default function ProductsPage(props: Props) {
  const { productsResponse } = props;
  const products = productsResponse?.body?.results;

  console.log(products);

  const buttons = [
    <Button className="card-btn-img0" key="one"></Button>,
    <Button className="card-btn-img1" key="two"></Button>,
    <Button className="card-btn-img2" key="three"></Button>,
    <Button className="card-btn-img3" key="four"></Button>,
    <Button className="card-btn-img4" key="five"></Button>,
  ];

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', gap: '35px' }}>
      <Box sx={{ minWidth: '25%' }}>
        <Paper
          sx={{
            position: 'fixed',
            left: '20px',
            width: '25%',
            height: 'calc(100vh - 140px)',
            minWidth: '200px',
            padding: '10px',
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Filters
          </Typography>
        </Paper>
      </Box>
      <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.slice(0, 6).map((product) => (
              <Grid item xs={3} sm={4} md={4} key={product.id}>
                <Card className="product-card" sx={{ maxWidth: 345 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonGroup size="small" aria-label="small button group">
                      {buttons}
                    </ButtonGroup>
                  </Box>

                  <CardMedia
                    className="product-card-img0"
                    component="img"
                    sx={{ height: 'auto' }}
                    image={product?.masterVariant.images?.[0]?.url}
                    title={product?.name['en-US']}
                  />
                  <CardMedia
                    className="product-card-img1"
                    component="img"
                    sx={{ height: 'auto' }}
                    image={product?.masterVariant.images?.[1]?.url}
                    title={product?.name['en-US']}
                  />
                  <CardMedia
                    className="product-card-img2"
                    component="img"
                    sx={{ height: 'auto' }}
                    image={product?.masterVariant.images?.[2]?.url}
                    title={product?.name['en-US']}
                  />
                  <CardMedia
                    className="product-card-img3"
                    component="img"
                    sx={{ height: 'auto' }}
                    image={product?.masterVariant.images?.[3]?.url}
                    title={product?.name['en-US']}
                  />
                  <CardMedia
                    className="product-card-img4"
                    component="img"
                    sx={{ height: 'auto' }}
                    image={product?.masterVariant.images?.[4]?.url}
                    title={product?.name['en-US']}
                  />

                  <CardContent className="product-card-content">
                    <Typography gutterBottom variant="h5" component="div">
                      {product?.name['en-US']}
                    </Typography>

                    <Typography gutterBottom variant="h6" component="div">
                      {product?.masterVariant?.attributes?.[6].value}{' '}
                    </Typography>

                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                      {`year: ${product?.masterVariant?.attributes?.[2].value}`} <br />
                      {`engine: ${product?.masterVariant?.attributes?.[9].value}`} <br />
                      {`gearbox: ${product?.masterVariant?.attributes?.[4].value[0].label}`} <br />
                      {`odometer: ${product?.masterVariant?.attributes?.[5].value}`}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button component={Link} size="small" href={`/${product.id}`}>
                      Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Stack>
      </Container>
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
