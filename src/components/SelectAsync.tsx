import AsyncSelectCreatable from 'react-select/async-creatable';
import { components, ControlProps } from 'react-select';
import React, { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
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

function Control({ children, ...props }: ControlProps<Option, false>) {
  return (
    <components.Control {...props}>
      <SearchIcon className="ml-1" /> {children}
    </components.Control>
  );
}

export default function SelectAsync() {
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
    if (typeof value === 'string' && !value.trim()) {
      return;
    }
    const product = foundProducts.find((item) => item.name['en-US'] === value);
    if (product) {
      router.push(`/products/${product.id}`);
    } else {
      const url = new URL(window.location.href);
      const search = url.searchParams;
      search.delete('category');
      value ? search.set('search', value) : search.delete('search');
      router.push(url.href);
    }
  };

  return (
    <AsyncSelectCreatable<Option, false>
      instanceId="async-select-search-products"
      formatCreateLabel={(value) => value}
      onChange={(e) => handleChange(e?.value)}
      isClearable
      className="w-full z-2"
      placeholder="..."
      cacheOptions
      loadOptions={loadOptions}
      noOptionsMessage={() => 'nothing found'}
      components={{
        Control,
      }}
    />
  );
}
