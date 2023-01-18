import { useContext } from 'react';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { RiCompass3Line } from 'react-icons/ri';
import AdventureContext from '../../context/adventureContext';

const StyledButton = styled(Button) `

  background-color: #487021;
  transition: transform 0.5s ease-in-out;

  &:hover {
    background: none;
    transform: scale(1.2);
  }

`;

const GeoButton = () => {

  const adventureContext = useContext(AdventureContext);
  const { markers, findMarkers } = adventureContext;

  // const length = Object.keys(parks).length;

  const onClick = () => {

    // fix this logic: enable the user to re-click the button after searching for a new park
    if(markers.length <= 0){

      findMarkers();

    };

  }

  return (

    <Box sx={{ zIndex: 10 }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
        <StyledButton onClick={onClick}>
          <RiCompass3Line size={25} />
        </StyledButton>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>

          { markers.length === 0 ? (

            <Typography color="#fff" variant="body2" fontWeight={700}>Find Parks Near You</Typography>

          ) : (

            <Typography color="#fff" variant="body2" fontWeight={700}>Parks Found!</Typography>

          )}

        </Box>
      </Stack>
    </Box>

  )
}

export default GeoButton;
