import React from 'react';
import { Box, Button, styled } from '@mui/material';
import { flexCenter } from '../theme/CustomTheme';

import logo from '../images/national-park-logo.png';

const StyledButton = styled(Button) `
  position: absolute;
  top: 0;
  right: 0;

  transition: transform 0.5s ease-in-out;

  &:hover {
    background: none;
    transform: scale(1.2);
  }

`;

const NavLogo = () => {

  const HomeButton = () => {

    window.location.reload();

  }

  return (
    <Box sx={{ flexCenter, position: "absolute", top: 10, right: -20 }}>
      <StyledButton onClick={HomeButton}>
        <Box component="img" src={logo} sx={{ height: "60px", width: "125px" }} alt="logo" title="Refresh Location"></Box>
      </StyledButton>
    </Box>
  )
}

export default NavLogo;
