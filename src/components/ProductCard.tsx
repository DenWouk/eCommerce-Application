import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  Link as LinkMui,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ProductProjection } from '@commercetools/platform-sdk';
import { memo, useMemo } from 'react';
import { AttributesProduct } from '@/src/types/commercetools';
import PriceProduct from '@/src/components/price/PriceProduct';
import CartChangeCountItemsButton from '@/src/components/CartChangeCountItemsButton';

type Props = {
  product: ProductProjection;
};

function ProductCard({ product }: Props) {
  const { price } = product.masterVariant;
  const attributes = useMemo(
    () =>
      product.masterVariant.attributes?.reduce(
        (accum, next) => ({ ...accum, [next.name]: next.value }),
        {} as AttributesProduct
      ),
    [product]
  );

  return (
    <Grid item xs={12} sm={6} md={4} key={product.id}>
      <Card className="product-card" sx={{ maxWidth: 345, m: '0 auto' }}>
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

        <Divider />

        <CardContent>
          <LinkMui
            underline="none"
            component={Link}
            href={`/products/product/${product.slug['en-US']}`}
          >
            <Typography
              gutterBottom
              variant="h6"
              className="product-card-name"
              sx={{
                color: 'inherit',
                textTransform: 'none',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product?.name['en-US']}
            </Typography>
          </LinkMui>

          <Typography className="flex justify-between items-center" gutterBottom variant="h6">
            <PriceProduct price={price} />
            <CartChangeCountItemsButton productId={product.id} />
          </Typography>

          <Typography
            gutterBottom
            variant="subtitle1"
            color="text.secondary"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {`year: ${attributes?.year || '--/--'}`} <br />
            {`engine: ${attributes?.engine || '--/--'}`} <br />
            {`gearbox: ${attributes?.transmission?.[0]?.label || '--/--'}`} <br />
            {`odometer: ${attributes?.odometer || '--/--'}`}
          </Typography>
        </CardContent>

        <CardActions>
          <Button component={Link} size="small" href={`/products/product/${product.slug['en-US']}`}>
            Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default memo(ProductCard);
