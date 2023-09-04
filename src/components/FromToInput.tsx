import React, { ChangeEvent, Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import { Box, LinearProgress, TextField } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { ProductProjection } from '@commercetools/platform-sdk';
import getProducts from '@/src/api/products';

type FromTo = {
  from?: string;
  to?: string;
};

type Props = {
  onChange: Dispatch<SetStateAction<ProductProjection[]>>;
};

export default function FromToInput({ onChange }: Props) {
  const [fromToValue, setFromToValue] = useState<FromTo>({ from: '', to: '' });
  const [error, setError] = useState<FromTo>({});
  const [isLoading, setIsLoading] = useState(false);
  const refOnChange = useRef(onChange);
  const debounceGetProduct = useMemo(
    () =>
      debounce(async (sort: FromTo) => {
        const result = await getProducts(sort);
        setIsLoading(false);
        refOnChange.current(result.body.results);
      }, 300),
    []
  );

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const normalizedValue = +value;

    if (Number.isNaN(normalizedValue) || (name !== 'from' && name !== 'to')) return;

    const isEmptyString = value.trim() === '';
    let isValid = false;
    const fromTo: FromTo = { ...fromToValue };

    if (!isEmptyString && +value === 0) {
      setError({ [name]: 'value should be more than 0' });
      fromTo[name as keyof FromTo] = value;
      setFromToValue(fromTo);
      return;
    }

    if (name === 'from') {
      if (!isEmptyString && fromTo?.to && +value > +fromTo.to) {
        setError({ from: '"from" should be less than "to"', to: undefined });
      } else {
        setError({});
        isValid = true;
      }
    }

    if (name === 'to') {
      if (!isEmptyString && fromTo?.from && +value < +fromTo.from) {
        setError({ from: undefined, to: '"to" should be more than "from"' });
      } else {
        setError({});
        isValid = true;
      }
    }

    fromTo[name as keyof FromTo] = value;
    setFromToValue(fromTo);

    if (isValid) {
      setIsLoading(true);
      debounceGetProduct({
        from: fromTo?.from ? (+fromTo.from * 100).toString() : undefined,
        to: fromTo?.to ? (+fromTo.to * 100).toString() : undefined,
      });
    }
  };

  return (
    <Box
      sx={{
        '&': {
          position: 'relative',
        },
        '& > div:nth-of-type(1) fieldset': {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRightColor: 'transparent',
        },
        '& > div:nth-last-of-type(1) fieldset': {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginLeft: '-1px',
        },
      }}
    >
      {(['from', 'to'] as (keyof FromTo)[]).map((item) => (
        <TextField
          key={item}
          name={item}
          label={item}
          value={fromToValue[item]}
          onChange={handleChange}
          inputProps={{ inputMode: 'numeric' }}
          size="small"
          error={!!error[item]}
          helperText={error[item]}
        />
      ))}

      {isLoading && (
        <LinearProgress
          className="absolute"
          sx={{ top: 'calc(100% - 4px)', width: '100%', borderRadius: '0 0 4px 4px' }}
          color="primary"
        />
      )}
    </Box>
  );
}
