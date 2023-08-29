import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Pagination,
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProductsPage(props: Props) {
  const { productsResponse } = props;
  const products = productsResponse?.body?.results;

  console.log(products[0].name['en-US']);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', gap: '35px' }}>
      <Box sx={{ minWidth: '25%' }}>
        <Paper
          sx={{ position: 'fixed', left: '20px', width: '25%', height: 'calc(100vh - 140px)' }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Lizard
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
            {Array.from(Array(9)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia sx={{ height: 140 }} image="/1.jpg" title="green iguana" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                      ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
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
