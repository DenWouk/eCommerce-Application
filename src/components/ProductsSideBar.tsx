import { Box, Checkbox, Divider, FormControlLabel, Paper, Typography } from '@mui/material';
import { FormEvent, memo } from 'react';
import FromToInput from '@/src/components/FromToInput';

type QueryValue = string | string[] | undefined;

type Props = {
  onChange: (formData: FormData) => void;
  filter: {
    body: QueryValue;
    make: QueryValue;
    color: QueryValue;
    transmission: QueryValue;
  };
};

function ProductsSideBar(props: Props) {
  const { onChange, filter } = props;
  const { body, make, transmission, color } = filter;

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    onChange(formData);
  };

  return (
    <Paper
      sx={{
        position: 'sticky',
        top: '90px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '15%',
        height: 'calc(100vh - 140px)',
        minWidth: '200px',
        padding: '10px',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          pl: '10px',
        }}
      >
        <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Price:</Typography>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <FromToInput />
        </Box>
      </Box>

      <Divider sx={{ m: '5px 0' }} />

      <form id="products-search" onChange={handleFormChange}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            pl: '10px',
          }}
        >
          <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Body:</Typography>
          {['Cabriolet', 'Coupe', 'Sedan', 'SUV', 'Wagon'].map((item) => (
            <FormControlLabel
              key={`body-${item}`}
              control={
                <Checkbox
                  checked={!!body?.includes(item)}
                  name="body"
                  value={item}
                  sx={{ p: '2px' }}
                />
              }
              label={item}
            />
          ))}
        </Box>

        <Divider sx={{ m: '5px 0' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            pl: '10px',
          }}
        >
          <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Make:</Typography>
          {['BMW', 'Ferrari', 'Jaguar', 'Land Rover', 'Mercedes-Benz', 'Porsche', 'Volvo'].map(
            (item) => (
              <FormControlLabel
                key={`make-${item}`}
                control={
                  <Checkbox
                    checked={!!make?.includes(item)}
                    name="make"
                    value={item}
                    sx={{ p: '2px' }}
                  />
                }
                label={item}
              />
            )
          )}
        </Box>

        <Divider sx={{ m: '5px 0' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            pl: '10px',
          }}
        >
          <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Transmission:</Typography>
          {['automatic', 'manual'].map((item) => (
            <FormControlLabel
              key={`transmission-${item}`}
              control={
                <Checkbox
                  checked={!!transmission?.includes(item)}
                  name="transmission"
                  value={item}
                  sx={{ p: '2px' }}
                />
              }
              label={item}
            />
          ))}
        </Box>
        <Divider sx={{ m: '5px 0' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            pl: '10px',
          }}
        >
          <Typography sx={{ ml: '-7px', fontWeight: 'bold' }}>Color:</Typography>

          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'start',
                flexWrap: 'wrap',
              }}
            >
              {['black', 'green', 'grey', 'red', 'white', 'yellow'].map((item) => (
                <FormControlLabel
                  key={`color-${item}`}
                  sx={{ width: '45%' }}
                  control={
                    <Checkbox
                      checked={!!color?.includes(item)}
                      name="color"
                      value={item}
                      sx={{ p: '2px' }}
                    />
                  }
                  label={item}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Divider sx={{ m: '5px 0' }} />
      </form>
    </Paper>
  );
}

export default memo(ProductsSideBar);
