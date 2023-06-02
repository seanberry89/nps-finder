import { Fragment } from 'react';
import { Box, Stack } from '@mui/material';

import NavLogo from './NavLogo';
import Address from './Address';
import Time from './Time';

import useGeolocation from '../../hooks/useGeolocation';

const Nav = () => {

  const coordinates = useGeolocation();

  return (

    <Fragment>

      { coordinates.loaded && (

        <Box sx={{ position: "fixed", backgroundColor: "transparent", zIndex: 5 }}>
          <Stack sx={{ py: 1, px: 2 }} direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
            <Address />
            <Time />
          </Stack>
          <Box sx={{ position: "fixed", top: 10, right: 8, display: { xs: "none", md: "flex" } }}>
            <NavLogo />
          </Box>
        </Box>

      ) }

    </Fragment>

  )
}

export default Nav;
