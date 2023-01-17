import { useContext } from 'react';
import { Box, Button, styled } from '@mui/material';
import { flexCenter } from '../../theme/CustomTheme';
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
  const { parks, findMarkers } = adventureContext;

  const length = Object.keys(parks).length;

  const onClick = () => {

    // fix this logic: enable the user to re-click the button after searching for a new park
    if(length === 0){

      findMarkers();

    }

  }

  return (

    <Box sx={{ ...flexCenter, zIndex: 10 }}>
      <StyledButton onClick={onClick}>
        <RiCompass3Line color="#fff" size={25} />
      </StyledButton>
    </Box>

  )
}

export default GeoButton;
