import { Price } from '@commercetools/platform-sdk';
import PriceWithDiscount from '@/src/components/price/PriceWithDiscount';

type Props = {
  price: Price | undefined;
};

export default function PriceProduct({ price }: Props) {
  let priceValue: number | undefined = Number(price?.value.centAmount) / 100;
  priceValue = Number.isNaN(priceValue) ? undefined : priceValue;

  let priceWithDiscountValue: number | undefined =
    Number(price?.discounted?.value?.centAmount) / 100;
  priceWithDiscountValue = Number.isNaN(priceWithDiscountValue)
    ? undefined
    : priceWithDiscountValue;

  return <PriceWithDiscount price={priceValue} priceWithDiscount={priceWithDiscountValue} />;
}
