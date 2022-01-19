import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectConvertedCurrency, convertCurrency } from '../../app/slice';


export default function Converter() {
  const convertedCurrency = useAppSelector(selectConvertedCurrency);
  const dispatch = useAppDispatch();
  const [localConvertedCurrency, setLocalConvertedCurrency] = React.useState<typeof convertedCurrency>(null);

  React.useEffect(() => {
    setLocalConvertedCurrency(convertedCurrency);
  }, [convertedCurrency]);

  const handlerChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const matches = event.target.value.match(/([0-9]+\.[0-9]*)|([0-9]*\.[0-9]+)|([0-9]+)|[A-Z]{3}/gm);
    if (matches?.length !== 3) {
      setLocalConvertedCurrency(null);
      return;
    }
    const [amount, from, to] = matches;
    console.log('amount =', amount, '  from =', from, '  to =', to);
    dispatch(convertCurrency({ amount, from, to }));

  }, [dispatch]);

  const handlerChangeDebounced = useDebouncedCallback(handlerChange, 750);

  return (
    <>
      <TextField
        label="example: 15 USD in UAH"
        fullWidth
        onChange={handlerChangeDebounced}
        InputProps={{
          endAdornment: localConvertedCurrency?.success && <InputAdornment position="start">{ localConvertedCurrency.result.toFixed(2) }</InputAdornment>,
        }}
      />

      {localConvertedCurrency?.success && <Typography variant="caption" display="block" gutterBottom>
        1 {localConvertedCurrency.query.from} = {localConvertedCurrency.info.rate.toFixed(2)} { localConvertedCurrency.query.to } ({ localConvertedCurrency.date })
      </Typography>}

      {!localConvertedCurrency?.success && <Typography variant="caption" color="error" display="block" gutterBottom>
        {localConvertedCurrency?.error.info}
      </Typography>}
    </>
  );
}