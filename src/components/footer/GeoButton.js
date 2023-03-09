import { useContext } from 'react';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { RiCompass3Line } from 'react-icons/ri';
import AdventureContext from '../../context/parkContext';

const StyledButton = styled(Button) `

  background-color: #487021;
  transition: transform 0.5s ease-in-out;

  &:hover {
    background: none;
    transform: scale(1.2);
  }

`;

const GeoButton = ({ text, setText }) => {

  const adventureContext = useContext(AdventureContext);
  const { markers, findMarkers } = adventureContext;


  const onClick = () => {

    if(markers.length <= 0){

      findMarkers();

    };

    if(text){

      setText("");

    };

  };

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
