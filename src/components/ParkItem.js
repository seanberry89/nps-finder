import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';


const ParkItem = ({ item }) => {

  const id = uuidv4();

  const { fullName, latLong, images  } = item;

  return (
    <Box>
      <Stack>
        <Typography variant="subtitle1">{fullName}</Typography>
        <Typography variant="subtitle2">{latLong}</Typography>
        { images && images.slice(0, 1).map(( image ) => (

          <Box component="img" key={id} src={image.url} alt={image.altText} sx={{ width: "125px", height: "150px", borderRadius: 10, opacity: 0.85 }}></Box>

        ))}
      </Stack>
    </Box>
  )
}

export default ParkItem;
