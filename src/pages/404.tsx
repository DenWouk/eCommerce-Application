import { Button } from '@mui/material';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex gap-5 flex-col items-center">
      <h2>404 - Page Not Found</h2>
      <Button component={Link} variant="outlined" href="/" sx={{ width: '95px' }}>
        Main
      </Button>
    </div>
  );
}
