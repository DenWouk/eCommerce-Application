import AsyncSelect from 'react-select/async';
import React from 'react';
import getProducts from '@/src/api/products';

type Option = {
  value: string;
  label: string;
};

const loadOptions = async (inputValue: string) => {
  const productsO = (await getProducts(inputValue)).body.results;
  return productsO.map<Option>((product) => ({
    value: product.name['en-US'],
    label: product.name['en-US'],
  }));
};

export default function SelectAsync() {
  return (
    <AsyncSelect
      instanceId="async-select-search-products"
      isClearable
      className="w-full"
      cacheOptions
      loadOptions={loadOptions}
      noOptionsMessage={() => 'Sorry, not found'}
    />
  );
}
