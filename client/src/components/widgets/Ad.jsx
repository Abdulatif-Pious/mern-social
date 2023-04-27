import { Box, Typography, useTheme } from '@mui/material';

import Wrapper from '../Wrapper';

const Add = () => {
  const { palette } = useTheme();

  return (
    <Wrapper>
      <Box
        display='flex'
        justifyContent="space-between"
      >
        <Typography fontWeight="bold" variant='body1' color={palette.neutral.main}>Sponsored</Typography>
        <Typography color={palette.neutral.mediumMain}>Create Ad</Typography>
      </Box>
      <img 
          src={`${import.meta.env.VITE_BASE_URL}/assets/info3.jpeg`}
          alt="ad_Img"
          width="100%"
          height="auto"
          style={{ margin: "1rem 0", borderRadius: "1rem" }}
        />
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography color={palette.neutral.main}>MikaCosmetics</Typography>
        <Typography color={palette.neutral.mediumMain}>mikacosmetics.com</Typography>
      </Box>
      <Typography mt='0.5rem' color={palette.neutral.mediumMain}>
        Your pathway to stunning and immaculate beauty and
        made sure your skin is exfoliating skin and 
        shining like light.
      </Typography>
    </Wrapper>
  );
};

export default Add;

