import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
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
  Typography,
} from '@mui/material';
import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SelectAsync from '@/src/components/SelectAsync';
import stolenImg from '@/public/stolen.jpg';
import SortButton from '@/src/components/SortButton';
import { ssrWithAuthToken } from '../../helpers/next/withAuthToken';
import NamesClients from '../../helpers/commercetools/consts';
import productModel from '../../helpers/commercetools/product';
import categoryModel from '../../helpers/commercetools/category/categoryModel';
import FromToInput from '../../components/FromToInput';

type ValueObjAttributesProduct = {
  key: string;
  label: string;
};

type AttributesProduct = {
  body: ValueObjAttributesProduct[];
  color: ValueObjAttributesProduct[];
  engine: string;
  interior: string;
  location: string;
  make: ValueObjAttributesProduct[];
  model: string;
  odometer: number;
  price: string;
  transmission: ValueObjAttributesProduct[];
  year: string;
};

type Props = {
  productsResponse: ClientResponse<ProductProjectionPagedQueryResponse>;
};

export default function ProductsPage(props: Props) {
  const { productsResponse } = props;
  const { results: products, total = 0, limit } = productsResponse.body;
  const refId = useRef<NodeJS.Timeout>();
  const attributesByUserId: Record<string, AttributesProduct> = useMemo(
    () =>
      products.reduce((ac, nx) => {
        const attributes = nx.masterVariant.attributes?.reduce(
          (accum, next) => ({ ...accum, [next.name]: next.value }),
          {}
        );
        return { ...ac, [nx.id]: attributes };
      }, {}),
    [products]
  );

  const router = useRouter();
  const page = [router.query.page].flat()[0] || '1';
  const sort = [router.query.sort].flat()[0];
  const order = [router.query.order].flat()[0];
  const [activeSortButton, setActiveSortButton] = useState(sort);

  const buttons = [
    <Button className="card-btn-img0" key="one" />,
    <Button className="card-btn-img1" key="two" />,
    <Button className="card-btn-img2" key="three" />,
    <Button className="card-btn-img3" key="four" />,
    <Button className="card-btn-img4" key="five" />,
  ];

  const handlePagination = (event: ChangeEvent<unknown>, value: number) => {
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.delete('category');
    value > 1 ? search.set('page', value.toString()) : search.delete('page');
    router.push(url.href);
  };

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const result = Array.from(formData.entries()).reduce(
      (prev, next) => {
        if (!next[1]) {
          return prev;
        }
        const copyPrev = { ...prev };
        if (next[0] in copyPrev) {
          copyPrev[next[0]] += `,${next[1]}`;
        } else {
          copyPrev[next[0]] = next[1].toString();
        }
        return copyPrev;
      },
      {} as Record<string, string>
    );

    const urlSearch = new URLSearchParams(result);
    const from = [router.query.from].flat()[0];
    const to = [router.query.to].flat()[0];
    from && urlSearch.set('from', from);
    to && urlSearch.set('from', to);
    sort && order && urlSearch.set('sort', sort);
    sort && order && urlSearch.set('order', order);
    router.push(`/products${urlSearch.toString() && `?${urlSearch}`}`);
  };

  const handleClick = (sortValue: string, orderValue: 'asc' | 'desc') => {
    setActiveSortButton(sortValue);
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.delete('category');
    search.delete('page');
    search.set('sort', sortValue);
    if (sort) {
      search.set('order', orderValue);
    } else {
      search.set('order', 'asc');
    }
    clearTimeout(refId.current);
    refId.current = setTimeout(() => {
      router.push(url.href);
    }, 200);
  };

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            pl: '10px',
          }}
        >
          <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Price:</Typography>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <FromToInput />
          </Box>
        </Box>
        <Divider sx={{ m: '5px 0' }} />

        <form id="products-search" onChange={handleFormChange}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              pl: '10px',
            }}
          >
            <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Body:</Typography>
            {['Cabriolet', 'Coupe', 'Sedan', 'SUV', 'Wagon'].map((item) => (
              <FormControlLabel
                key={`body-${item}`}
                control={
                  <Checkbox
                    checked={!!router.query.body?.includes(item)}
                    name="body"
                    value={item}
                    sx={{ p: '2px' }}
                  />
                }
                label={item}
              />
            ))}
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
            {['BMW', 'Ferrari', 'Jaguar', 'Land Rover', 'Mercedes-Benz', 'Porsche', 'Volvo'].map(
              (item) => (
                <FormControlLabel
                  key={`make-${item}`}
                  control={
                    <Checkbox
                      checked={!!router.query.make?.includes(item)}
                      name="make"
                      value={item}
                      sx={{ p: '2px' }}
                    />
                  }
                  label={item}
                />
              )
            )}
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
            {['automatic', 'manual'].map((item) => (
              <FormControlLabel
                key={`transmission-${item}`}
                control={
                  <Checkbox
                    checked={!!router.query.transmission?.includes(item)}
                    name="transmission"
                    value={item}
                    sx={{ p: '2px' }}
                  />
                }
                label={item}
              />
            ))}
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
                {['black', 'green', 'grey'].map((item) => (
                  <FormControlLabel
                    key={`color-${item}`}
                    control={
                      <Checkbox
                        checked={!!router.query.color?.includes(item)}
                        name="color"
                        value={item}
                        sx={{ p: '2px' }}
                      />
                    }
                    label={item}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                }}
              >
                {['red', 'white', 'yellow'].map((item) => (
                  <FormControlLabel
                    key={`color-${item}`}
                    control={
                      <Checkbox
                        checked={!!router.query.color?.includes(item)}
                        name="color"
                        value={item}
                        sx={{ p: '2px' }}
                      />
                    }
                    label={item}
                  />
                ))}
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
            '& > :not(style)': { width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <SelectAsync />
        </Box>

        {products.length ? (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <Stack direction="row" spacing={1}>
                <SortButton
                  order={order}
                  onClick={handleClick}
                  active={activeSortButton === 'name.en-US'}
                  targetSort="name.en-US"
                  label="Name"
                />
                <SortButton
                  order={order}
                  onClick={handleClick}
                  active={activeSortButton === 'price'}
                  targetSort="price"
                  label="Price"
                />
              </Stack>

              <Pagination
                count={Math.ceil(total / limit)}
                page={page ? +page : undefined}
                onChange={handlePagination}
                sx={{ m: '0 auto' }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {products.map((product) => {
                  const attributes = attributesByUserId[product.id];
                  const { price } = product.masterVariant;
                  return (
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
                            {price?.discounted ? (
                              <>
                                <del
                                  style={{
                                    fontSize: '14px',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    borderRadius: '5px',
                                    padding: '0 3px',
                                  }}
                                >
                                  {`$ ${(price?.value.centAmount || 0) / 100}`}
                                </del>
                                <span
                                  className="bg-blue-300 rounded-md"
                                  style={{
                                    marginLeft: '5px',
                                    padding: '0 3px',
                                  }}
                                >{`$ ${(price?.discounted?.value.centAmount || 0) / 100}`}</span>
                              </>
                            ) : (
                              <div>{`$ ${(price?.value?.centAmount || 0) / 100 || '--/--'}`}</div>
                            )}
                          </Typography>

                          <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            {`year: ${attributes?.year || '--/--'}`} <br />
                            {`engine: ${attributes?.engine || '--/--'}`} <br />
                            {`gearbox: ${attributes?.transmission?.[0]?.label || '--/--'}`} <br />
                            {`odometer: ${attributes?.odometer || '--/--'}`}
                          </Typography>
                        </CardContent>

                        <CardActions>
                          <Button component={Link} size="small" href={`/products/${product.id}`}>
                            Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <Pagination
                count={Math.ceil(total / limit)}
                page={page ? +page : undefined}
                onChange={handlePagination}
                sx={{ p: 0 }}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ alignSelf: 'center' }}>
            <Typography
              sx={{ textAlign: 'center' }}
              gutterBottom
              variant="h5"
              color=""
              component="div"
            >
              Oops, it looks like everything was stolen
            </Typography>
            <Image
              src={stolenImg}
              width={stolenImg.width}
              height={stolenImg.height}
              alt="stolen cars"
            />
          </Box>
        )}
      </Container>
    </Container>
  );
}

export const getServerSideProps = ssrWithAuthToken<
  Props & { authorized: boolean },
  { category: string[] }
>(async ({ req, token, params, query }) => {
  const authorized = token?.type === NamesClients.PASSWORD;
  const { page } = query;
  const slugCategory = params?.category?.at(-1);
  try {
    const categoryResponse = slugCategory
      ? await categoryModel.getCategoryBySlug(req, slugCategory)
      : undefined;
    const productsResponse = await productModel.getProducts(req, {
      page: page ? +page : undefined,
      category: categoryResponse && categoryResponse.body.results[0]?.id,
      ...query,
    });
    const categoriesResponse = await categoryModel.getCategories(req);
    return { props: { authorized, productsResponse, categoriesResponse } };
  } catch {
    return {
      notFound: true,
    };
  }
});
