import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { fixedBottom } from '../../theme/CustomTheme';

import GeoButton from './GeoButton';
import Search from './Search';

const Footer = () => {

  const [ text, setText ] = useState('');

  return (
    <Box sx={{ ...fixedBottom, backgroundColor: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur(3px)", height: "15vh" }}>
      <Stack sx={{ height: "110%" }} justifyContent="center" alignItems="center" direction="row" spacing={2}>
        <Search text={text} setText={setText} />
        <GeoButton text={text} setText={setText} />
      </Stack>
    </Box>
  );
};

export default Footer;
