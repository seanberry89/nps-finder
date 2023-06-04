import React from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import { flexCenter } from '../../theme/CustomTheme';
import { FadeLoader } from 'react-spinners';

const WhiteBackground = styled(Box) `
  position: fixed;
  inset: 0;
  height: 100%;
  background-color: #fff;
  z-index: 1;
`;

const Loading = () => {

  return (
    <Box sx={{ ...flexCenter, position: "relative", height: "100vh" }}>
      <WhiteBackground></WhiteBackground>
      <Stack sx={{ position: "absolute", width: "450px", height: "450px", pt: 8, zIndex: 2 }} direction="column" justifyContent="center" alignItems="center" spacing={10}>
        <FadeLoader loading color="#454545" />
        <Typography color="#454545" fontSize={{ xs: "25px", md: "35px" }}>Refreshing User Location</Typography>
      </Stack>
    </Box>
  );

};

export default Loading;
