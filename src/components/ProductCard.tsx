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
  IconButton,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Image from 'next/image';
import Link from 'next/link';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useMemo } from 'react';
import { AttributesProduct } from '@/src/types/commercetools';
import { useCartContext } from '../context/CartContext';

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
  console.log(product, 'product.id');
  
  const { getItemsQuantity, increaseItems, decreaseItems, removeItems } = useCartContext();
  // console.log(product.id, " product-----------------------------");

const quantity = 6
 // console.log(getItemsQuantity, "quantity product-----------------------------");
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
          {quantity === 0 ? (
            <Button variant="outlined" onClick={()=> increaseItems(product.id)}>+ add to cart</Button>
          ) : (
            <div>
              <Box sx={{ display: 'flex' }}>
                <IconButton aria-label="remove" size="small" onClick={()=> decreaseItems(product.id)}>
                  <RemoveRoundedIcon />
                </IconButton>
                <Typography>{quantity} in cart</Typography>
                <IconButton aria-label="add" size="small" onClick={()=> increaseItems(product.id)}>
                  <AddRoundedIcon />
                </IconButton>
              </Box>
              <Button
                variant="outlined"
                sx={{
                  color: 'red',
                  margin: 'auto',
                  padding: 0.5,
                  fontSize: '0.6rem',
                  display: 'flex',
                }}
                onClick={()=> removeItems(product.id)}>
                remove
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
