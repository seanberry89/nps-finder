import React from 'react';
import { Box, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { flexCenter } from '../../../theme/CustomTheme';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

const StyledPaper = styled(Paper) `

  position: relative;
  background-color: #0D1130;
  background-image: linear-gradient(#0D1130, #283785);
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

const Night = ({ time, setVisible }) => {

  const closeBtn = () => {

    setVisible(false);

  }

  return (
    <Box sx={flexCenter}>
      <StyledPaper elevation={6}>
        <CloseButton sx={{ position: "absolute", top: 0, left: -5 }} onClick={closeBtn}><MdCancel color="#487021" size={20} /></CloseButton>
        <Stack sx={{ textAlign: "center" }} justifyContent="center" alignItems="center" direction="row" spacing={2}>
          <BsFillMoonStarsFill size={20} />
          <Typography sx={{ fontFamily: "Lato", fontWeight: "300" }} color="#fff" variant="h5">{time.toLocaleTimeString([], {
            hour: "2-digit", minute: "2-digit"
          })}</Typography>
        </Stack>
      </StyledPaper>
    </Box>
  )
}

export default Night;
