import React from 'react';
import { Box, Button, styled } from '@mui/material';

import logo from './../../images/national-park-logo.png';

const StyledButton = styled(Button) `

  width: 75px;
  height: 75px;
  border-radius: 30px;

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
    <Box>
      <StyledButton onClick={HomeButton}>
        <Box component="img" src={logo} sx={{ height: "75px", width: "150px" }} alt="logo" title="Refresh Location"></Box>
      </StyledButton>
    </Box>
  )
}

export default NavLogo;
