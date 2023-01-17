import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import { fixedBottom } from '../theme/CustomTheme';

import GeoButton from './buttons/GeoButton';
import SearchButton from './buttons/SearchButton';

const Footer = () => {

  return (
    <Box sx={{ ...fixedBottom, backgroundColor: "rgba(0, 0, 0, 0.18)", backdropFilter: "blur(3px)", height: "10vh" }}>
      <Container maxWidth="xl">
        <Stack sx={{ py: 2, height: "10vh" }} justifyContent="center" alignItems="center" direction="row" spacing={2}>
          <GeoButton />
          <SearchButton />
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer;
