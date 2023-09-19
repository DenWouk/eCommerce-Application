import { LineItem } from '@commercetools/platform-sdk';
import PriceWithDiscount from '@/src/components/price/PriceWithDiscount';

type Props = {
  lineItem: LineItem;
};

export default function PriceTotal({ lineItem }: Props) {
  const { price, quantity, totalPrice } = lineItem;
  const priceTotalValue = (price.value.centAmount / 100) * quantity;
  return (
    <PriceWithDiscount price={priceTotalValue} priceWithDiscount={totalPrice.centAmount / 100} />
  );
}
