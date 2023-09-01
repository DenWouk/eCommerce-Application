import React from 'react';
import { Box, Container, Paper, Stack, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  minHeight: '50%',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
  return (
    <Container maxWidth="xl" sx={{ display: 'flex', gap: '35px', flex: '1 1 auto' }}>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2} sx={{ height: '100%' }}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
      </Box>
    </Container>
  );
}
