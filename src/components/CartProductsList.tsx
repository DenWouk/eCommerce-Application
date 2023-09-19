import { Dispatch, Fragment } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  Link as LinkMui,
} from '@mui/material';
import Image from 'next/image';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Cart } from '@commercetools/platform-sdk';
import Link from 'next/link';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { updateCart } from '@/src/api/carts';
import { ActionType } from '@/src/contexts/MyContext';
import PriceProduct from './price/PriceProduct';

type Props = {
  cart: Cart;
  onChange: Dispatch<ActionType>;
};

export default function CartProductsList({ cart, onChange }: Props) {
  const { lineItems, version, id } = cart;
  const handleChange = async (
    type: 'add' | 'remove' | 'delete',
    productId: string,
    lineItemId: string
  ) => {
    let currentCart: Cart | undefined;
    if (type === 'add') {
      currentCart = await updateCart('addLineItem', {
        id,
        version,
        actions: { productId, quantity: 1 },
      });
    } else if (type === 'remove') {
      currentCart = await updateCart('removeLineItem', {
        id,
        version,
        actions: { lineItemId, quantity: 1 },
      });
    } else {
      currentCart = await updateCart('changeLineItemQuantity', {
        id,
        version,
        actions: { lineItemId, quantity: 0 },
      });
    }

    onChange({ type: 'CHANGE', value: currentCart });
  };

  return (
    <List>
      {lineItems ? (
        lineItems.map((item) => {
          const { price, name, variant, id: lineItemId, productId, quantity, productSlug } = item;

          return (
            <Fragment key={item.id}>
              <ListItem className="flex-col relative">
                <IconButton
                  className="absolute right-0"
                  onClick={() => handleChange('delete', productId, lineItemId)}
                >
                  <DeleteForeverIcon color="error" />
                </IconButton>

                <Stack
                  gap={1}
                  width="100%"
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="center"
                  direction="row"
                >
                  <LinkMui
                    component={Link}
                    underline="none"
                    width={120}
                    href={`/products/${productSlug?.['en-US'] || ''}`}
                  >
                    <Box minWidth={240} alignSelf="center">
                      {name['en-US']}
                    </Box>
                    <Image
                      src={variant?.images?.[0]?.url ?? ''}
                      alt={name['en-US']}
                      width={120}
                      height={90}
                    />
                  </LinkMui>

                  <Stack direction="row" alignItems="center" flexGrow={1} minWidth={340}>
                    <Stack
                      width="100%"
                      direction="row"
                      alignItems="center"
                      justifyContent="end"
                      spacing={1}
                    >
                      <PriceProduct price={price} />
                      <div>x</div>
                    </Stack>

                    <Stack alignItems="center">
                      <IconButton
                        aria-label="add"
                        onClick={() => handleChange('add', productId, lineItemId)}
                      >
                        <AddCircleRoundedIcon sx={{ color: '#6195c3' }} />
                      </IconButton>

                      <Typography variant="h6" component="div">
                        {quantity}
                      </Typography>

                      <IconButton onClick={() => handleChange('remove', productId, lineItemId)}>
                        <RemoveCircleOutlineRoundedIcon sx={{ color: '#6195c3' }} />
                      </IconButton>
                    </Stack>

                    <Stack
                      width="100%"
                      direction="row"
                      alignItems="center"
                      justifyContent="start"
                      spacing={1}
                    >
                      <div>=</div>
                      <div>
                        {(quantity *
                          (price.discounted
                            ? price.discounted.value.centAmount
                            : price.value.centAmount)) /
                          100}
                      </div>
                    </Stack>
                  </Stack>
                </Stack>
              </ListItem>
              <Divider />
            </Fragment>
          );
        })
      ) : (
        <Typography
          style={{
            textAlign: 'center',
          }}
          variant="subtitle1"
          gutterBottom
        >
          No items in the cart
        </Typography>
      )}
    </List>
  );
}
