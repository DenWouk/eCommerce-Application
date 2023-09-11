import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import stolenImg from '@/public/stolen.jpg';

export default function NotFoundProducts() {
  return (
    <Box sx={{ alignSelf: 'center' }}>
      <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" color="" component="div">
        Oops, it looks like everything was stolen
      </Typography>
      <Image src={stolenImg} width={stolenImg.width} height={stolenImg.height} alt="stolen cars" />
    </Box>
  );
}
