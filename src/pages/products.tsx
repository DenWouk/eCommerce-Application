import React, { useState } from 'react';
import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import Image from 'next/image';
import { Button } from '@mui/material';
import Link from 'next/link';
import productModel from '@/src/helpers/commercetools/product';
import NamesClients, { CurrencyCode } from '@/src/helpers/commercetools/consts';
import getProducts from '@/src/api/products';
import { ssrWithAuthToken } from '@/src/helpers/next/withAuthToken';

type Props = {
  productsResponse: ClientResponse<ProductProjectionPagedQueryResponse>;
};

export default function ProductsPage(props: Props) {
  const { productsResponse } = props;
  const productsResults = productsResponse?.body?.results;

  const [products, setProducts] = useState(productsResults);
  const [value, setValue] = useState('');
  console.log(products[2]?.variants?.[0]?.prices);

  return (
    <div className="flex flex-col text-sm gap-4 items-center">
      <input
        className="border-2 border-amber-950"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button
        component={Link}
        variant="contained"
        href=""
        sx={{ background: '#6195c3fe' }}
        onClick={async () => {
          const result = await getProducts(value);
          setProducts(result.body.results);
        }}
      >
        Search
      </Button>

      <div className="flex flex-wrap gap-3">
        {products &&
          products.map((product) => {
            const priceValue = product.masterVariant.price?.value;
            return (
              <div className="flex flex-col" key={product.id}>
                <div className="text-sm">{product.name['en-US']}</div>
                <Image
                  width={100}
                  height={150}
                  style={{
                    height: 'auto',
                  }}
                  src={product.masterVariant?.images?.[0]?.url || '/'}
                  alt={product.masterVariant?.images?.[0]?.label || 'not found image'}
                />
                <div>
                  {priceValue
                    ? CurrencyCode[priceValue.currencyCode as keyof typeof CurrencyCode]
                    : '$'}{' '}
                  {priceValue ? priceValue.centAmount / 100 : ''}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export const getServerSideProps = ssrWithAuthToken<Props & { authorized: boolean }>(
  async ({ req, token }) => {
    const authorized = token?.type === NamesClients.PASSWORD;
    const productsResponse = await productModel.getProducts(req);
    // const categories = await productModel.getProductCategory(req);
    // const productsByCategories = await productModel.getProductByCategory(
    //   req,
    //   categories.body.results[3].id
    // );
    // console.log(productsByCategories);
    return { props: { authorized, productsResponse } };
  }
);
