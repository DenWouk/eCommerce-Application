import { Box, Stack, Typography } from '@mui/material';

type Props = {
  price: number | undefined;
  priceWithDiscount?: number;
};

export default function PriceWithDiscount({ price, priceWithDiscount }: Props) {
  if (!price) {
    return (
      <Typography gutterBottom variant="h6" component="div">
        --/--
      </Typography>
    );
  }
  return (
    <Typography
      sx={{ m: 0 }}
      gutterBottom
      variant="h6"
      component={Stack}
      direction="row"
      alignItems="end"
      flexWrap="wrap"
      justifyContent="start"
    >
      {priceWithDiscount ? (
        <>
          <Box
            component="span"
            sx={(theme) => ({
              bgcolor: theme.palette.primary.main,
              color: 'white',
              borderRadius: '6px',
              marginRight: '5px',
              padding: '0 3px',
            })}
          >{`$${priceWithDiscount}`}</Box>
          <del
            style={{
              fontSize: '14px',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '5px',
              padding: '0 3px',
            }}
          >
            {`$${price}`}
          </del>
        </>
      ) : (
        <div>{`$${price}`}</div>
      )}
    </Typography>
  );
}

PriceWithDiscount.defaultProps = {
  priceWithDiscount: undefined,
};
