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
import { ProductProjection } from '@commercetools/platform-sdk';
import { useMemo } from 'react';
import { AttributesProduct } from '@/src/types/commercetools';

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

export default function ProductCard({ product }: Props) {
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
              alt={`car ${product.name}`}
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
}
