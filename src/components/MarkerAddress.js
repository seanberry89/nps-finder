import React from 'react';
import { Box, Typography } from '@mui/material';
import { flexCenter } from '../theme/CustomTheme';

const MarkerAddress = ({ address }) => {
  return (
    <Box sx={flexCenter}>
      <Typography sx={{ fontFamily: "Roboto", fontWeight: "700" }} variant="body2">{`${address.line1}`} {`${address.city}`}, {`${address.stateCode}`}</Typography>
    </Box>
  )
}

export default MarkerAddress;
