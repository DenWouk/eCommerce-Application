/* eslint-disable import/no-extraneous-dependencies */
import { Stack, TextField, Typography, Container, Button } from '@mui/material';

// const Item = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#000',
//   border: '1px solid',
//   borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
//   padding: theme.spacing(1),
//   borderRadius: '4px',
//   textAlign: 'center',
// }));

function SignInPage() {
  return (
    <Container>
      <Stack spacing={2} className="m-10">
        <Typography variant="h4"> Register </Typography>

        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          helperText="Enter Email"
        />
          <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          helperText="Enter Password"
        />
        <Button variant="contained" href="/">
          Sign in
        </Button>
     
      </Stack>
    </Container>
  );
}
export default SignInPage;
