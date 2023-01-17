import React from 'react';
import { Box } from '@mui/material';
import { flexCenter } from '../theme/CustomTheme';

const MarkerImage = ({ image }) => {

  return (
    <Box sx={flexCenter}>
      <Box component="img" src={image.url} alt={image.altText} sx={{ width: "75px", height: "75px", borderRadius: 10 }}></Box>
    </Box>
  )

}

export default MarkerImage;
