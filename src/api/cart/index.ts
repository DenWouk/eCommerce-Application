import { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import getConfig from 'next/config';

const { ROOT_APP = '' } = getConfig().publicRuntimeConfig as Record<string, string | undefined>;
const cart = [
  {
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
  },
  {
    type: 'Cart',
    id: 'd6ee8c80-b776-45f3-8bf3-5f9bf71d2d7f',
    version: 3,
    versionModifiedAt: '2023-08-01T15:39:03.962Z',
    lastMessageSequenceNumber: 1,
    createdAt: '2023-08-01T15:39:03.806Z',
    lastModifiedAt: '2023-08-01T15:39:03.958Z',
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
    key: 'sampleUsa-01-cart',
    customerEmail: 'samplecustomer.usa@example.com',
    customerGroup: {
      typeId: 'customer-group',
      id: 'c620b9d6-2f0a-4458-85ba-1268026a0213',
    },
    lineItems: [
      {
        id: 'ce3b6256-73a1-4885-9cec-3852e3c0b7fd',
        productId: 'a14065b7-1d64-4095-91c8-d35ad7c6f0ac',
        productKey: 'tote_bag',
        name: {
          'en-US': 'Sample Tote Bag',
        },
        productType: {
          typeId: 'product-type',
          id: '91a856cf-b255-4df8-b8c8-5a8cd4ca3aa9',
          version: 1,
        },
        variant: {
          id: 1,
          sku: '718289',
          key: '718289',
          prices: [
            {
              id: '1fae964f-dd6d-49bf-a43e-f9b77e59b874',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 13999,
                fractionDigits: 2,
              },
              country: 'US',
            },
            {
              id: '031a691b-f32b-4368-8ceb-ec3863c5149d',
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 12099,
                fractionDigits: 2,
              },
              country: 'DE',
            },
          ],
          images: [
            {
              url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/tote-V4lrDZ9Q.png',
              dimensions: {
                w: 766,
                h: 800,
              },
            },
          ],
          attributes: [
            {
              name: 'type',
              value: {
                key: 'Bag',
                label: 'Bag',
              },
            },
          ],
          assets: [],
        },
        price: {
          id: '1fae964f-dd6d-49bf-a43e-f9b77e59b874',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 13999,
            fractionDigits: 2,
          },
          country: 'US',
        },
        quantity: 2,
        discountedPricePerQuantity: [],
        taxRate: {
          name: 'NJ Sales Tax',
          amount: 0.0663,
          includedInPrice: false,
          country: 'US',
          state: 'New Jersey',
          id: 'Brnufyhy',
          subRates: [],
        },
        perMethodTaxRate: [],
        addedAt: '2023-08-01T15:39:03.796Z',
        lastModifiedAt: '2023-08-01T15:39:03.796Z',
        state: [
          {
            quantity: 2,
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
          currencyCode: 'USD',
          centAmount: 27998,
          fractionDigits: 2,
        },
        taxedPrice: {
          totalNet: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 27998,
            fractionDigits: 2,
          },
          totalGross: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 29854,
            fractionDigits: 2,
          },
          totalTax: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 1856,
            fractionDigits: 2,
          },
        },
        taxedPricePortions: [],
      },
      {
        id: 'b83e526a-00cc-454b-857d-bdcaec199771',
        productId: '391d42c0-01c6-43eb-906a-74677962d787',
        productKey: 'toddler_trousers',
        name: {
          'en-US': 'Sample Toddler Trousers',
        },
        productType: {
          typeId: 'product-type',
          id: '60b3ba43-8599-49d5-bd8b-ffdd491bfa17',
          version: 1,
        },
        variant: {
          id: 2,
          sku: '855485',
          key: '855485',
          prices: [
            {
              id: 'b66d7a14-970d-46ac-9f21-b3393948bcca',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2599,
                fractionDigits: 2,
              },
              country: 'US',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 2339,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: 'aefc17eb-e988-470b-8eda-14932b54ef5a',
                },
              },
            },
            {
              id: 'b1d657b9-ec67-40e1-8a75-c876cbe62b5d',
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 2299,
                fractionDigits: 2,
              },
              country: 'DE',
              discounted: {
                value: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 2069,
                  fractionDigits: 2,
                },
                discount: {
                  typeId: 'product-discount',
                  id: 'aefc17eb-e988-470b-8eda-14932b54ef5a',
                },
              },
            },
          ],
          images: [
            {
              url: 'https://607c34ad0a5bf735fdf7-ec12c9005026a0c273dadf2c3ac4444b.ssl.cf3.rackcdn.com/whitepants-SbjnediW.gif',
              dimensions: {
                w: 612,
                h: 792,
              },
            },
          ],
          attributes: [
            {
              name: 'size',
              value: {
                key: 'Medium',
                label: 'Medium',
              },
            },
            {
              name: 'fit',
              value: {
                key: 'Straight',
                label: 'Straight',
              },
            },
            {
              name: 'color',
              value: {
                key: 'White',
                label: 'White',
              },
            },
            {
              name: 'length',
              value: {
                key: 'Ankle',
                label: 'Ankle',
              },
            },
          ],
          assets: [],
        },
        price: {
          id: 'b66d7a14-970d-46ac-9f21-b3393948bcca',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 2599,
            fractionDigits: 2,
          },
          country: 'US',
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 2339,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: 'aefc17eb-e988-470b-8eda-14932b54ef5a',
            },
          },
        },
        quantity: 1,
        discountedPricePerQuantity: [],
        taxRate: {
          name: 'NJ Sales Tax',
          amount: 0.0663,
          includedInPrice: false,
          country: 'US',
          state: 'New Jersey',
          id: 'Brnufyhy',
          subRates: [],
        },
        perMethodTaxRate: [],
        addedAt: '2023-08-01T15:39:03.796Z',
        lastModifiedAt: '2023-08-01T15:39:03.796Z',
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
          currencyCode: 'USD',
          centAmount: 2339,
          fractionDigits: 2,
        },
        taxedPrice: {
          totalNet: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 2339,
            fractionDigits: 2,
          },
          totalGross: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 2494,
            fractionDigits: 2,
          },
          totalTax: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 155,
            fractionDigits: 2,
          },
        },
        taxedPricePortions: [],
      },
    ],
    cartState: 'Ordered',
    totalPrice: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 30337,
      fractionDigits: 2,
    },
    taxedPrice: {
      totalNet: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 30337,
        fractionDigits: 2,
      },
      totalGross: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 32348,
        fractionDigits: 2,
      },
      taxPortions: [
        {
          rate: 0.0663,
          amount: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 2011,
            fractionDigits: 2,
          },
          name: 'NJ Sales Tax',
        },
      ],
      totalTax: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 2011,
        fractionDigits: 2,
      },
    },
    country: 'US',
    taxedShippingPrice: {
      totalNet: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      totalGross: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      taxPortions: [
        {
          rate: 0.0663,
          amount: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 0,
            fractionDigits: 2,
          },
          name: 'NJ Sales Tax',
        },
      ],
      totalTax: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
    },
    shippingMode: 'Single',
    shippingInfo: {
      shippingMethodName: 'Sample Shipping Method USA/Australia',
      price: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      shippingRate: {
        price: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 1299,
          fractionDigits: 2,
        },
        freeAbove: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 10000,
          fractionDigits: 2,
        },
        tiers: [],
      },
      taxRate: {
        name: 'NJ Sales Tax',
        amount: 0.0663,
        includedInPrice: false,
        country: 'US',
        state: 'New Jersey',
        id: 'Brnufyhy',
        subRates: [],
      },
      taxCategory: {
        typeId: 'tax-category',
        id: '8e1cc48f-949c-4420-af60-062b0d76204c',
      },
      deliveries: [],
      shippingMethod: {
        typeId: 'shipping-method',
        id: 'c2895f5a-63d4-4cbc-91ce-de34f76cfd94',
      },
      discountedPrice: {
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
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
              currencyCode: 'USD',
              centAmount: 0,
              fractionDigits: 2,
            },
          },
        ],
      },
      taxedPrice: {
        totalNet: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 0,
          fractionDigits: 2,
        },
        totalGross: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 0,
          fractionDigits: 2,
        },
        totalTax: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 0,
          fractionDigits: 2,
        },
      },
      shippingMethodState: 'MatchesCart',
    },
    shippingAddress: {
      firstName: 'Sample Customer',
      lastName: 'USA',
      streetName: 'Main Street',
      streetNumber: '1',
      postalCode: '56789',
      city: 'Mainville',
      state: 'New Jersey',
      country: 'US',
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
      lastName: 'USA',
      streetName: 'Main Street',
      streetNumber: '1',
      postalCode: '56789',
      city: 'Mainville',
      state: 'New Jersey',
      country: 'US',
    },
    itemShippingAddresses: [],
    totalLineItemQuantity: 3,
  },
];

export default async function getCartItems(
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {

  //   const data = await fetch(`${ROOT_APP}/{projectKey}/carts/{id}`, {
  const data = await fetch(`${ROOT_APP}/api/cart`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const body = await res.json();
    throw new Error(body.message);
  });
  return data.json();
}
