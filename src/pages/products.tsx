import React from 'react';
import {
  Box,
  Button,
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

type Props = {
  productsResponse: ClientResponse<ProductProjectionPagedQueryResponse>;
};

export default function ProductsPage(props: Props) {
  const { productsResponse } = props;
  const products = productsResponse?.body?.results;

  console.log(products);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', gap: '35px' }}>
      <Box sx={{ minWidth: '26%' }}>
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
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={3} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 140 }}
                    image={products[index]?.masterVariant.images?.[0]?.url}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {products[index]?.name['en-US']}
                    </Typography>

                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                      {`year: ${products[index]?.masterVariant?.attributes?.[2].value}`}
                    </Typography>

                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                      {`odometer: ${products[index]?.masterVariant?.attributes?.[5].value}`}
                    </Typography>

                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                      {`gearbox: ${products[index]?.masterVariant?.attributes?.[4].value[0].label}`}
                    </Typography>

                    <Typography variant="subtitle1">
                      {products[index]?.masterVariant?.attributes?.[6].value}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Details</Button>
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
