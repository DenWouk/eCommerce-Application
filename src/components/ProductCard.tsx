import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { memo, useContext, useMemo } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { AttributesProduct } from '@/src/types/commercetools';
import PriceProduct from '@/src/components/price/PriceProduct';
import CartIconButton from '@/src/components/CartIconButton';
import { getCarts, updateCart } from '@/src/api/carts';
import MyContext from '@/src/contexts/MyContext';
import NamesClients from '@/src/helpers/commercetools/consts';
import { showError } from '@/src/helpers/toastify';

const buttons = [
  <Button className="card-btn-img0" key="one" />,
  <Button className="card-btn-img1" key="two" />,
  <Button className="card-btn-img2" key="three" />,
  <Button className="card-btn-img3" key="four" />,
  <Button className="card-btn-img4" key="five" />,
];

type Props = {
  product: ProductProjection;
};

function ProductCard({ product }: Props) {
  const { status } = useSession();
  const { state, dispatch } = useContext(MyContext);
  const { id = '', version = 0, lineItems = [] } = state.cart || {};
  const lineItemId = useMemo(
    () => lineItems?.find((value) => value.productId === product.id)?.id,
    [lineItems, product]
  );
  const { price } = product.masterVariant;
  const attributes = useMemo(
    () =>
      product.masterVariant.attributes?.reduce(
        (accum, next) => ({ ...accum, [next.name]: next.value }),
        {} as AttributesProduct
      ),
    [product]
  );

  const handleChange = async (type: 'add' | 'remove') => {
    let cart: Cart | undefined;
    if (type === 'add') {
      let currenId = id;
      let currenVersion = version;
      if (status === 'unauthenticated') {
        const res = await signIn(NamesClients.ANONYMOUS, { redirect: false });
        if (res?.error) {
          showError('Oops, something went wrong, try again later');
          return;
        }
        const newCart = await getCarts();
        currenId = newCart.id;
        currenVersion = newCart.version;
      }

      cart = await updateCart('addLineItem', {
        id: currenId,
        version: currenVersion,
        actions: { productId: product.id, quantity: 1 },
      });
    } else {
      if (!lineItemId) {
        throw new Error('lineItem nof found'); // FIXME
      }
      cart = await updateCart('removeLineItem', {
        id,
        version,
        actions: { lineItemId, quantity: 1 },
      });
    }

    dispatch({ type: 'CHANGE', value: cart });
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={product.id}>
      <Card className="product-card" sx={{ maxWidth: 345 }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <Box
            className={`product-card-img${index}`}
            key={index}
            sx={{ width: '100%', aspectRatio: 4 / 3, position: 'relative' }}
          >
            <Image
              fill
              style={{
                objectFit: 'cover',
              }}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAPAAAJaWlv///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              src={product?.masterVariant.images?.[index]?.url || '#'}
              sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, 33vw"
              alt={`car ${product.name['en-US']}`}
            />
          </Box>
        ))}

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
            <PriceProduct price={price} />
          </Typography>

          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            {`year: ${attributes?.year || '--/--'}`} <br />
            {`engine: ${attributes?.engine || '--/--'}`} <br />
            {`gearbox: ${attributes?.transmission?.[0]?.label || '--/--'}`} <br />
            {`odometer: ${attributes?.odometer || '--/--'}`}
          </Typography>
        </CardContent>

        <CardActions className="flex justify-between">
          <Button component={Link} size="small" href={`/products/${product.id}`}>
            Details
          </Button>
          {lineItemId ? (
            <CartIconButton onClick={handleChange} type="remove" />
          ) : (
            <CartIconButton onClick={handleChange} />
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default memo(ProductCard);
