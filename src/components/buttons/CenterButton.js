import { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { FaHome } from 'react-icons/fa';

import AdventureContext from '../../context/adventureContext';

const CenterButton = ({ mapMove }) => {

  const adventureContext = useContext(AdventureContext);
  const { setPosition } = adventureContext;

  const onClick = () => {

    if(mapMove){

    }

  }

  return (
    <Box sx={{ position: "fixed", bottom: 100, left: 25, border: "1px solid red", zIndex: 5 }}>
      <Button sx={{ backgroundColor: "black" }} onClick={onClick}>
        <FaHome color="white" size={50} />
      </Button>
    </Box>
  )
}

export default CenterButton;

