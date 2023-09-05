import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ssrWithAuthToken } from '../helpers/next/withAuthToken';
import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import NamesClients from '../helpers/commercetools/consts';
import productModel from '../helpers/commercetools/product';
import Link from 'next/link';
import categoryModel from '../helpers/commercetools/category/categoryModel';
import FromToInput from '../components/FromToInput';

type Props = {
  productsResponse: ClientResponse<ProductProjectionPagedQueryResponse>;
};

export default function ProductsPage(props: Props) {
  const { productsResponse } = props;
  const products = productsResponse?.body?.results;

  console.log(products);

  const [page, setPage] = React.useState(1);
  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [value, setValue] = React.useState<number[]>([20, 37]);
  const handleSlider = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const [checked, setChecked] = React.useState(true);
  const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
    // setChecked(event.target.checked);
  };

  const buttons = [
    <Button className="card-btn-img0" key="one"></Button>,
    <Button className="card-btn-img1" key="two"></Button>,
    <Button className="card-btn-img2" key="three"></Button>,
    <Button className="card-btn-img3" key="four"></Button>,
    <Button className="card-btn-img4" key="five"></Button>,
  ];

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', gap: '35px' }}>
      <Paper
        sx={{
          position: 'sticky',
          top: '90px',
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '15%',
          height: 'calc(100vh - 140px)',
          minWidth: '200px',
          padding: '10px',
          overflow: 'auto',
        }}
      >
        <form onChange={handleFormChange}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              pl: '10px',
            }}
          >
            <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Price:</Typography>
            <Box sx={{ display: 'flex', width: '90%' }}>
              <FromToInput />
            </Box>

            <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Year:</Typography>
            <Box sx={{ width: '90%' }}>
              <FromToInput />
            </Box>
          </Box>
          <Divider sx={{ m: '5px 0' }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              pl: '10px',
            }}
          >
            <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Body:</Typography>
            <FormControlLabel
              control={<Checkbox name="cabriolet" sx={{ p: '2px' }} />}
              label="Cabriolet"
            />
            <FormControlLabel control={<Checkbox name="coupe" sx={{ p: '2px' }} />} label="Coupe" />
            <FormControlLabel control={<Checkbox name="sedan" sx={{ p: '2px' }} />} label="Sedan" />
            <FormControlLabel control={<Checkbox name="suv" sx={{ p: '2px' }} />} label="SUV" />
            <FormControlLabel control={<Checkbox name="wagon" sx={{ p: '2px' }} />} label="Wagon" />
          </Box>
          <Divider sx={{ m: '5px 0' }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              pl: '10px',
            }}
          >
            <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Make:</Typography>
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="BMW" />
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="Ferrari" />
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="Jaguar" />
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="Land Rover" />
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="Mercedes-Benz" />
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="Porsche" />
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="Volvo" />
          </Box>
          <Divider sx={{ m: '5px 0' }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              pl: '10px',
            }}
          >
            <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Transmission:</Typography>
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="automatic" />
            <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="manual" />
          </Box>
          <Divider sx={{ m: '5px 0' }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              pl: '10px',
            }}
          >
            <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Color:</Typography>

            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                }}
              >
                <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="black" />
                <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="green" />
                <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="grey" />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                }}
              >
                <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="red" />
                <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="white" />
                <FormControlLabel control={<Checkbox sx={{ p: '2px' }} />} label="yellow" />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ m: '5px 0' }} />
        </form>
      </Paper>

      <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Search" variant="outlined" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Typography sx={{ display: 'flex', alignItems: 'end', pb: '4px' }}>
            Page: {page}
          </Typography>
          <Pagination count={10} page={page} onChange={handlePagination} sx={{ p: 0 }} />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.slice(0, 9).map((product) => (
              <Grid item xs={3} sm={4} md={4} key={product.id}>
                <Card className="product-card" sx={{ maxWidth: 345 }}>
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

                  <ButtonGroup
                    className="img-btns"
                    size="small"
                    aria-label="small button group"
                    sx={{ display: 'flex', justifyContent: 'center', p: '5px' }}
                  >
                    {buttons}
                  </ButtonGroup>
                  <Divider />

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

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Typography sx={{ display: 'flex', alignItems: 'end', pb: '4px' }}>
            Page: {page}
          </Typography>
          <Pagination count={10} page={page} onChange={handlePagination} sx={{ p: 0 }} />
        </Box>
      </Container>
    </Container>
  );
}

export const getServerSideProps = ssrWithAuthToken<
  Props & { authorized: boolean },
  { category: string[] }
>(async ({ req, token, params, query }) => {
  const authorized = token?.type === NamesClients.PASSWORD;
  const { page, color, transmission, make, body } = query;
  const slugCategory = params?.category?.at(-1);
  try {
    const categoryResponse = slugCategory
      ? await categoryModel.getCategoryBySlug(req, slugCategory)
      : undefined;
    const productsResponse = await productModel.getProducts(req, {
      page: page ? +page : undefined,
      category: categoryResponse && categoryResponse.body.results[0]?.id,
      color: Array.isArray(color) ? color[0] : color,
      transmission: Array.isArray(transmission) ? transmission[0] : transmission,
      make: Array.isArray(make) ? make[0] : make,
      body: Array.isArray(body) ? body[0] : body,
    });
    const categoriesResponse = await categoryModel.getCategories(req);
    return { props: { authorized, productsResponse, categoriesResponse } };
  } catch (e) {
    return {
      notFound: true,
    };
  }
});
