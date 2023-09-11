import AsyncSelectCreatable from 'react-select/async-creatable';
import { components, ControlProps } from 'react-select';
import React, { useMemo, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
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
  const refInputValue = useRef('');
  const router = useRouter();
  const searchQuery = [router.query.search].flat()[0];
  const debounceGetProduct = useMemo(
    () =>
      debounce(async (search: string, callBack: Function) => {
        const products = await getProducts(search && `search=${search}`);
        callBack(products);
      }, 300),
    []
  );

  const loadOptions = async (value: string) => {
    if (!value.trim()) {
      return [];
    }
    const products = await new Promise<ClientResponse<ProductProjectionPagedSearchResponse>>(
      (resolve) => {
        debounceGetProduct(value, resolve);
      }
    );
    const { results } = products.body;
    const options = results.map<Option>((product) => ({
      value: product.name['en-US'],
      label: product.name['en-US'],
    }));
    const { current } = refInputValue;
    current && options.unshift({ value: current, label: current });
    return options;
  };

  const handleChange = (value: string | undefined) => {
    if (typeof value === 'string' && !value.trim()) {
      return;
    }
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.delete('category');
    search.delete('page');
    value ? search.set('search', value) : search.delete('search');
    router.push(url.href, undefined, { shallow: true });
  };

  return (
    <AsyncSelectCreatable<Option, false>
      instanceId="async-select-search-products"
      formatCreateLabel={(value) => value}
      value={searchQuery ? { value: searchQuery, label: searchQuery } : null}
      onChange={(e) => handleChange(e?.value)}
      onInputChange={(value) => {
        refInputValue.current = value;
      }}
      isClearable
      className="w-full z-2"
      placeholder="..."
      cacheOptions
      loadOptions={loadOptions}
      noOptionsMessage={() => 'nothing found'}
      styles={{
        clearIndicator: () => ({ cursor: 'pointer' }),
      }}
      components={{ Control }}
    />
  );
}
