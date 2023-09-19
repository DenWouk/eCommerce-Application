import { Typography } from '@mui/material';

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
    <Typography sx={{ m: 0 }} gutterBottom variant="h6" component="div">
      {priceWithDiscount ? (
        <>
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
          <span
            className="bg-blue-300 rounded-md"
            style={{
              marginLeft: '5px',
              padding: '0 3px',
            }}
          >{`$${priceWithDiscount}`}</span>
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
