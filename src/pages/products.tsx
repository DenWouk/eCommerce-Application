import React, { Fragment, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import Image from 'next/image';
import { Button } from '@mui/material';
import Link from 'next/link';
import productModel from '@/src/helpers/commercetools/product';
import NamesClients from '@/src/helpers/commercetools/consts';
import getProducts from '@/src/api/products';

type Props = {
  productsResponse: ClientResponse<ProductProjectionPagedQueryResponse>;
  authorized: boolean;
};

export default function ProductsPage(props: Props) {
  const { productsResponse, authorized } = props;
  const products = productsResponse?.body?.results;
  const [value, setValue] = useState('');
  return (
    <>
      <div>{String(authorized)}</div>
      <input
        className="border-2 border-amber-950"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* <div>{searchedValue}</div> */}

      <Button
        component={Link}
        variant="contained"
        href=""
        sx={{ background: '#6195c3fe' }}
        onClick={async () => {
          await getProducts(value);
        }}
      >
        Search
      </Button>

      <div className="flex flex-wrap gap-3">
        {products &&
          products.map((product) => (
            <div className="flex flex-col" key={product.id}>
              <div className="text-sm">{product.name['en-US']}</div>
              <Image
                width={100}
                height={100}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
                src={product.masterVariant?.images?.[0]?.url || '/'}
                alt={product.masterVariant?.images?.[0]?.label || 'not found image'}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const authorized = (await getToken({ req }))?.type === NamesClients.PASSWORD;
  const productsResponse = await productModel.getProducts(req);
  const categories = await productModel.getProductCategory(req);
  const productsByCategories = await productModel.getProductByCategory(
    req,
    categories.body.results[3].id
  );
  console.log(productsByCategories);
  return { props: { authorized, productsResponse } };
};
