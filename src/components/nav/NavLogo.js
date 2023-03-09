import React from 'react';
import { Box, Button, styled } from '@mui/material';

import logo from './../../images/national-park-logo.png';

const StyledButton = styled(Button) `

  width: 90px;
  height: 90px;
  border-radius: 30px;

  transition: transform 0.5s ease-in-out;

  &:hover {
    background: none;
    transform: scale(1.15);
  }

`;


const StyledImage = styled(Box) `

  height: 100%;
  width: 100%;
  object-fit: cover;

`;

const NavLogo = () => {

  const HomeButton = () => {

    window.location.reload();

  }

  return (
    <Box>
      <StyledButton onClick={HomeButton}>
        <StyledImage component="img" src={logo} alt="logo" title="Refresh Location" />
      </StyledButton>
    </Box>
  )
}

export default NavLogo;
