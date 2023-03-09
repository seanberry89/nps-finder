import React from 'react';
import { Box, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { flexCenter } from '../../../theme/CustomTheme';
import { BsFillSunFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

// Sunrise:
// #FF6700, #1D71F2
// background-color:
// To Top Left

// Morning:
// #1D71F2, #FFCD00
// background-color: #1D71F2
// To Top Right

// Afternoon:
// #1D71F2, #FFCD00
// background-color: #1D71F2
// To Top Left

// Sunset:
// #F1671F, #152852
// To Top Right
// background-color: #152852

// Night:
// #283785, #0D1130
// linear-gradient
// background-color: #0D1130


const StyledPaper = styled(Paper) `

  position: relative;
  background-color: #152852;
  background-image: linear-gradient(to top left, #FFCD00, #1D71F2);
  color: #fff;

  border-radius: 30px;
  padding: 10px 20px;

`;

const CloseButton = styled(IconButton) `

background-color: #fff;
padding: 0;

&:hover {
  background-color: #fff;
}

`;

const Morning = ({ time, setVisible }) => {

  const closeBtn = () => {

    setVisible(false);

  }

  return (
    <Box sx={flexCenter}>
      <StyledPaper elevation={6}>
        <CloseButton sx={{ position: "absolute", top: 0, left: -5 }} onClick={closeBtn}><MdCancel color="#487021" size={20} /></CloseButton>
        <Stack sx={{ textAlign: "center" }} justifyContent="center" alignItems="center" direction="row" spacing={2}>
          <BsFillSunFill size={20} />
          <Typography sx={{ fontFamily: "Lato", fontWeight: "300" }} color="#fff" variant="h5">{time.toLocaleTimeString([], {
            hour: "2-digit", minute: "2-digit"
          })}</Typography>
        </Stack>
      </StyledPaper>
    </Box>
  )
}

export default Morning;
