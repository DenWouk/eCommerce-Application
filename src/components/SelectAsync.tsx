import AsyncSelectCreatable from 'react-select/async-creatable';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { useRouter } from 'next/router';
import { debounce } from '@mui/material/utils';
import getProducts from '@/src/api/products';

type Option = {
  value: string;
  label: string;
};

type Props = {
  onChange: Dispatch<SetStateAction<ProductProjection[]>>;
};

export default function SelectAsync({ onChange }: Props) {
  const [foundProducts, setFoundProducts] = useState<ProductProjection[]>([]);
  const router = useRouter();

  const debounceGetProduct = useMemo(
    () =>
      debounce(async (search: string, callBack: Function) => {
        const products = await getProducts({ search });
        callBack(products);
      }, 300),
    []
  );

  const loadOptions = async (inputValue: string) => {
    if (!inputValue.trim()) {
      return [];
    }
    const products = await new Promise<ClientResponse<ProductProjectionPagedSearchResponse>>(
      (resolve) => {
        debounceGetProduct(inputValue, resolve);
      }
    );
    const { results } = products.body;
    setFoundProducts(results);
    return results.map<Option>((product) => ({
      value: product.name['en-US'],
      label: product.name['en-US'],
    }));
  };

  const handleChange = (value: string | undefined) => {
    if (!value) {
      return;
    }
    const product = foundProducts.find((item) => item.name['en-US'] === value);
    if (product) {
      router.push(`/${product.id}`);
    } else {
      onChange(foundProducts);
    }
  };

  return (
    <AsyncSelectCreatable<Option, false>
      instanceId="async-select-search-products"
      formatCreateLabel={(value) => value}
      onChange={(e) => handleChange(e?.value)}
      isClearable
      className="w-full z-10"
      placeholder="type ..."
      cacheOptions
      loadOptions={loadOptions}
      noOptionsMessage={() => 'nothing found'}
    />
  );
}
