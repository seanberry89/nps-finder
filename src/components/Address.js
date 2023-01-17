import { Fragment, useContext, useState, useEffect } from 'react';
import { Box, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { flexCenter } from '../theme/CustomTheme';
import { MdCancel } from 'react-icons/md';

import AdventureContext from '../context/adventureContext';
import useGeolocation from '../hooks/useGeolocation';

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

  const adventureContext = useContext(AdventureContext);
  const { address, reverseGeo } = adventureContext;

  const [visible, setVisible] = useState(true);

  const coordinates = useGeolocation();

  const id = uuidv4();


  useEffect(() => {

    if(coordinates.loaded){

      reverseGeo(coordinates);

    }

    // eslint-disable-next-line
  }, [coordinates]);


  let items = address.results;


  const closeBtn = () => {

    setVisible(false);

  }

  return (
    <Fragment>

      {/* edit this component as a ternary operator, so ? and :, so the data appears via geolocation or search feature */}

      { visible && (

        <Box sx={{ flexCenter }}>
          <StyledPaper elevation={6}>
            <CloseButton sx={{ position: "absolute", top: -3, left: -5 }} onClick={closeBtn}><MdCancel color="#487021" size={20} /></CloseButton>
            <Stack sx={{ mt: 1.5 }} justifyContent="flex-start" alignItems="flex-start" direction="column" spacing={-0.5}>
              <Typography variant="body2">Estimated Address:</Typography>
              { items && items.slice(0, 1).map((item) => (
                  <Typography key={id} variant="h6" sx={{ fontFamily: "Roboto", mt: 2 }}>{item.formatted_address.replace(", USA", "")}</Typography>
                )
              )}
            </Stack>
          </StyledPaper>
        </Box>

      )}

    </Fragment>
  )
}

export default Address;
