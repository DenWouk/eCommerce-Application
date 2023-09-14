import { NextApiRequest, NextApiResponse } from 'next';
import { handlerAuthToken } from '@/src/helpers/next/withAuthToken';
import { UpdateCartWithTypeAction } from '@/src/types/commercetools';
// import cartModel from '@/src/helpers/commercetools/cart';

const cartsResponse = {
  type: 'Cart',
  id: 'fcf5670f-aff2-4d72-afcf-fc1a5cbb201d',
  version: 4,
  versionModifiedAt: '2023-08-01T15:39:03.956Z',
  lastMessageSequenceNumber: 1,
  createdAt: '2023-08-01T15:39:03.803Z',
  lastModifiedAt: '2023-08-01T15:39:03.951Z',
  lastModifiedBy: {
    isPlatformClient: true,
    user: {
      typeId: 'user',
      id: 'a18ff06c-11ae-400b-8f2e-554c0e575c8b',
    },
  },
  createdBy: {
    isPlatformClient: true,
    user: {
      typeId: 'user',
      id: 'a18ff06c-11ae-400b-8f2e-554c0e575c8b',
    },
  },
  key: 'sample-germany-01-cart',
  customerEmail: 'samplecustomer.germany@example.com',
  lineItems: [
    {
      id: '4e891caf-d9e1-43b0-bef4-9054444d2101',
      productId: 'b73ca64a-6dff-4815-9171-11fa0d2107d9',
      productKey: 'necklace',
      name: {
        'en-US': 'Sample Necklace',
      },
      productType: {
        typeId: 'product-type',
        id: '91a856cf-b255-4df8-b8c8-5a8cd4ca3aa9',
        version: 1,
      },
      variant: {
        id: 1,
        sku: '752502',
        key: '752502',
        prices: [
          {
            id: '52428b47-07ff-4aa2-a4c9-d42c867a6739',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 5000,
              fractionDigits: 2,
            },
            country: 'DE',
          },
          {
            id: '2301ae98-152e-4e72-abae-6a97f3b2e742',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 5000,
              fractionDigits: 2,
            },
            country: 'US',
          },
          {
            id: '64ad98ef-a1ff-4d93-b076-fc0c7b016806',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 5000,
              fractionDigits: 2,
            },
            country: 'ES',
          },
        ],
        images: [
          {
            url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/necklace-TRlWhVSq.png',
            dimensions: {
              w: 103,
              h: 122,
            },
          },
        ],
        attributes: [
          {
            name: 'type',
            value: {
              key: 'Jewelry',
              label: 'Jewelry',
            },
          },
          {
            name: 'engraving',
            value: 'Happy Anniversary',
          },
        ],
        assets: [],
      },
      price: {
        id: '52428b47-07ff-4aa2-a4c9-d42c867a6739',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 5000,
          fractionDigits: 2,
        },
        country: 'DE',
      },
      quantity: 1,
      discountedPricePerQuantity: [],
      taxRate: {
        name: 'VAT',
        amount: 0.19,
        includedInPrice: true,
        country: 'DE',
        id: 'pqUTxCHo',
        subRates: [],
      },
      perMethodTaxRate: [],
      addedAt: '2023-08-01T15:39:03.793Z',
      lastModifiedAt: '2023-08-01T15:39:03.793Z',
      state: [
        {
          quantity: 1,
          state: {
            typeId: 'state',
            id: 'dd02de43-88fe-466c-a50c-4f5a73b92339',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 5000,
        fractionDigits: 2,
      },
      taxedPrice: {
        totalNet: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 4202,
          fractionDigits: 2,
        },
        totalGross: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 5000,
          fractionDigits: 2,
        },
        totalTax: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 798,
          fractionDigits: 2,
        },
      },
      taxedPricePortions: [],
    },
  ],
  cartState: 'Ordered',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 5000,
    fractionDigits: 2,
  },
  taxedPrice: {
    totalNet: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 4202,
      fractionDigits: 2,
    },
    totalGross: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 5000,
      fractionDigits: 2,
    },
    taxPortions: [
      {
        rate: 0.19,
        amount: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 798,
          fractionDigits: 2,
        },
        name: 'VAT',
      },
    ],
    totalTax: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 798,
      fractionDigits: 2,
    },
  },
  country: 'DE',
  taxedShippingPrice: {
    totalNet: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 0,
      fractionDigits: 2,
    },
    totalGross: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 0,
      fractionDigits: 2,
    },
    taxPortions: [
      {
        rate: 0.19,
        amount: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 0,
          fractionDigits: 2,
        },
        name: 'VAT',
      },
    ],
    totalTax: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 0,
      fractionDigits: 2,
    },
  },
  shippingMode: 'Single',
  shippingInfo: {
    shippingMethodName: 'Sample Shipping Method Europe',
    price: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 1299,
      fractionDigits: 2,
    },
    shippingRate: {
      price: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 1299,
        fractionDigits: 2,
      },
      freeAbove: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 15000,
        fractionDigits: 2,
      },
      tiers: [],
    },
    taxRate: {
      name: 'VAT',
      amount: 0.19,
      includedInPrice: true,
      country: 'DE',
      id: 'pqUTxCHo',
      subRates: [],
    },
    taxCategory: {
      typeId: 'tax-category',
      id: '8e1cc48f-949c-4420-af60-062b0d76204c',
    },
    deliveries: [],
    shippingMethod: {
      typeId: 'shipping-method',
      id: '4918cf3f-13d1-4287-938d-0ae02c9b9ed8',
    },
    discountedPrice: {
      value: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 0,
        fractionDigits: 2,
      },
      includedDiscounts: [
        {
          discount: {
            typeId: 'cart-discount',
            id: '4ab9f2ec-204e-44bd-adce-8a7b5294969a',
          },
          discountedAmount: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 1299,
            fractionDigits: 2,
          },
        },
      ],
    },
    taxedPrice: {
      totalNet: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 0,
        fractionDigits: 2,
      },
      totalGross: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 0,
        fractionDigits: 2,
      },
      totalTax: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 0,
        fractionDigits: 2,
      },
    },
    shippingMethodState: 'MatchesCart',
  },
  shippingAddress: {
    firstName: 'Sample Customer',
    lastName: 'Germany',
    streetName: 'Sample Street',
    streetNumber: '1',
    postalCode: '12345',
    city: 'Sample Town',
    country: 'DE',
  },
  shipping: [],
  customLineItems: [],
  discountCodes: [],
  directDiscounts: [],
  inventoryMode: 'None',
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  deleteDaysAfterLastModification: 90,
  refusedGifts: [],
  origin: 'Merchant',
  billingAddress: {
    firstName: 'Sample Customer',
    lastName: 'Germany',
    streetName: 'Sample Street',
    streetNumber: '1',
    postalCode: '12345',
    city: 'Sample Town',
    country: 'DE',
  },
  itemShippingAddresses: [],
  totalLineItemQuantity: 1,
};
export default handlerAuthToken(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // await cartModel
    //   .getCart(req)
    //   .then((cartsResponse) => {
        res.status(200).json(cartsResponse);
      // })
      // .catch(() => {
      //   res.status(400).json({ message: 'Oops, something went wrong, try again later' });
      // });
  }

  if (req.method === 'POST') {
    const body = req.body as UpdateCartWithTypeAction;
    // await cartModel
    //   .updateCart(req, body)
    //   .then((cartsResponse) => {
    //     res.status(200).json(cartsResponse);
    //   })
    //   .catch(() => {
    //     res.status(400).json({ message: 'Oops, something went wrong, try again later' });
    //   });
  }
});
