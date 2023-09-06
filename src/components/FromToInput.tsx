import React, { ChangeEvent, useMemo, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useRouter } from 'next/router';

type FromTo = {
  from?: string;
  to?: string;
};

export default function FromToInput() {
  const router = useRouter();
  const from = [router.query?.from].flat()[0] || '';
  const to = [router.query?.to].flat()[0] || '';
  const [fromToValue, setFromToValue] = useState<FromTo>({ from, to });
  const [error, setError] = useState<FromTo>({});
  const [isSending, setIsSending] = useState(false);
  const debounceGetProduct = useMemo(
    () =>
      debounce(async ({ from: priceFrom, to: priceTo }: FromTo) => {
        const url = new URL(window.location.href);
        const search = url.searchParams;
        search.delete('category');
        priceFrom ? search.set('from', priceFrom) : search.delete('from');
        priceTo ? search.set('to', priceTo) : search.delete('to');
        if (!isSending) {
          setIsSending(true);
          await router.push(url.href);
          setIsSending(false);
        }
      }, 300),
    [isSending, router]
  );

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const normalizedValue = +value;

    if (Number.isNaN(normalizedValue) || (name !== 'from' && name !== 'to')) return;

    const isEmptyString = value.trim() === '';
    let isValid = false;
    const fromTo: FromTo = { ...fromToValue };

    if (!isEmptyString && +value === 0) {
      setError({ [name]: `${name} > 0` });
      fromTo[name as keyof FromTo] = value;
      setFromToValue(fromTo);
      return;
    }

    if (name === 'from') {
      if (!isEmptyString && fromTo?.to && +value > +fromTo.to) {
        setError({ from: 'from < to', to: undefined });
      } else {
        setError({});
        isValid = true;
      }
    }

    if (name === 'to') {
      if (!isEmptyString && fromTo?.from && +value < +fromTo.from) {
        setError({ from: undefined, to: 'to > from' });
      } else {
        setError({});
        isValid = true;
      }
    }
    fromTo[name as keyof FromTo] = value;
    setFromToValue(fromTo);

    if (isValid) {
      debounceGetProduct({
        from: fromTo?.from ? (+fromTo.from).toString() : undefined,
        to: fromTo?.to ? (+fromTo.to).toString() : undefined,
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '5px',
        '&': {
          position: 'relative',
        },
        '& > div:nth-of-type(1) fieldset': {
          border: 'solid 2px',
          borderRadius: '3px',
        },
        '& > div:nth-last-of-type(1) fieldset': {
          border: 'solid 2px',
          borderRadius: '3px',
        },
      }}
    >
      {(['from', 'to'] as (keyof FromTo)[]).map((item) => (
        <TextField
          key={item}
          sx={{ '& p': { m: 1 } }}
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
    </Box>
  );
}
