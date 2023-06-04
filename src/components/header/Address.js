import { Fragment, useContext, useState, useEffect } from 'react';
import { Box, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { flexCenter } from '../../theme/CustomTheme';
import { MdCancel } from 'react-icons/md';

import ParkContext from '../../context/parkContext';
import useGeolocation from '../../hooks/useGeolocation';

import { v4 as uuidv4 } from 'uuid';

const StyledPaper = styled(Paper) `

  position: relative;
  border-radius: 10px;
  padding: 10px;

`;

const CloseButton = styled(IconButton) `

background-color: #fff;
padding: 0;

&:hover {
  background-color: #fff;
}

`;

const Address = () => {

  const parkContext = useContext(ParkContext);
  const { geoAddress, parkAddress, reverseGeo } = parkContext;

  const [visible, setVisible] = useState(true);

  const coordinates = useGeolocation();

  let geo = geoAddress.results;

  const id = uuidv4();


  useEffect(() => {

    if(coordinates.loaded){

      reverseGeo(coordinates);

    };

    // eslint-disable-next-line
  }, [coordinates]);


  const closeBtn = () => {

    setVisible(false);

  };


  return (
    <Fragment>

      { visible && (

        <Box sx={{ flexCenter }}>
          <StyledPaper elevation={6}>
            <CloseButton sx={{ position: "absolute", top: -3, left: -5 }} onClick={closeBtn}><MdCancel color="#487021" size={20} /></CloseButton>
            <Stack sx={{ mt: 1.5 }} justifyContent="flex-start" alignItems="flex-start" direction="column" spacing={{ xs: 0 }}>

              { !parkAddress ? (

                <Fragment>
                  <Typography fontWeight={400} fontSize={{ xs: 14, md: 16 }}>Estimated User Location:</Typography>
                  { geo && geo.slice(0, 1).map((item) => (
                      <Typography key={id} fontSize={{ xs: "15px", md: "18px" }} fontFamily="Roboto" fontWeight={500} sx={{ mt: 2 }}>{item.formatted_address.replace(", USA", "")}</Typography>
                    )
                  )}
                </Fragment>

              ) : (

                <Fragment>
                  <Typography fontWeight={400} fontSize={{ xs: 14, md: 16 }}>Searched {parkAddress.designation}:</Typography>
                  <Typography key={id} fontSize={{ xs: "15px", md: "18px" }} fontFamily="Roboto" fontWeight={500} sx={{ mt: 2 }}>{parkAddress.fullName}, {parkAddress.states}</Typography>
                </Fragment>

              )}

            </Stack>
          </StyledPaper>
        </Box>

      )}

    </Fragment>
  );
};

export default Address;
