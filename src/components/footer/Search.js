import { useContext, useState, useEffect } from 'react';
import { Box, ListItem, ListItemButton, ListItemText, Grid, Stack, styled, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { flexCenter } from '../../theme/CustomTheme';

import { FiSearch } from 'react-icons/fi';
import { FaTree } from 'react-icons/fa';

import AdventureContext from '../../context/parkContext';
import { useSearchDebounce } from '../../hooks/useSearchDebounce';

const StyledTextField = styled(TextField)({

  "width": "250px",

  "& .MuiInput-root": {
    fontSize: 16
  },

  "& .MuiInput-input": {
    "&::placeholder": {
      fontSize: 16
    }
  }

});

const ResultsBox = styled(motion.div) `

  position: absolute;
  top: 155px;
  background-color: #fff;
  width: 100%;
  height: 150px;
  border-radius: 20px;
  margin-bottom: 50px;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

`;

const resultsVariants = {
  expanded: {
    position: "absolute",
    top: "-155px"
  },
  collapsed: {
    position: "absolute",
    top: "155px"
  }
}

const ResultsItem = styled(ListItem) `

  color: black;
  width: 400px;
  height: 50px;
  padding: 0px 10px;

  &:hover {
    background-color: #eeeeee;
  }

`;

const ResultsItemButton = styled(ListItemButton) `

  transition: transform 0.5s ease-in-out;

  &:hover {

    transform: scale(1.1);
    background: transparent;

  }

`;

const Search = ({ text, setText }) => {

  const adventureContext = useContext(AdventureContext);
  const { searches, searchParks, searchParksCoords, searchParksAddress, showSearch, setShowSearch, clearMarkers } = adventureContext;

  const [ didMount, setDidMount ] = useState(false);

  const debounceSearch = useSearchDebounce(text, 1500);

  useEffect(() => {

    if(!didMount){

      setDidMount(true);

      return;

    };

    searchParks(debounceSearch);

    // eslint-disable-next-line
  }, [debounceSearch]);


  let items = searches.data;


  const onClick = (item) => {

    const parseLat = parseFloat(item.latitude);
    const parseLng = parseFloat(item.longitude);

    const coords = { lat: parseLat, lng: parseLng };

    searchParksCoords(coords);

    searchParksAddress(item);

    setText('');

    clearMarkers();

    // unless I insert the item into another setState?
    // setParkAddress();

  };


  const onChange = (e) => {

    setText(e.target.value);

  };


  const onFocus = () => {

    setShowSearch(true);

  };


  return (

    <Box sx={{ ...flexCenter, position: "relative", width: "400px", height: "40px", borderRadius: 5, backgroundColor: "#fff", zIndex: 5 }}>

      <Stack sx={{ width: "98%", height: "100%", px: 2 }} direction="row" alignItems="center" justifyContent="space-between" spacing={2}>

        <StyledTextField variant="standard" value={text} InputProps={{ disableUnderline: true }} placeholder="search for a national park" onChange={onChange} onFocus={onFocus} />

        <FiSearch color="#bebebe" size={25} />

      </Stack>

      { text.length > 0 && (

        <ResultsBox animate={showSearch ? "expanded" : "collapsed"} variants={resultsVariants}>
          <Grid container>

            { items?.filter(item => item.fullName.toLowerCase().startsWith(text.toLowerCase())).map((item) => (

              <Grid key={item.id} item>
                <ResultsItem disablePadding>
                  <ResultsItemButton component="button" onClick={() => onClick(item)}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} >
                      <FaTree color="#487021" size={10} />
                      <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary={item.fullName} />
                    </Stack>
                  </ResultsItemButton>
                </ResultsItem>
              </Grid>

            )) }

          </Grid>
        </ResultsBox>

      )}

    </Box>

  );
};

export default Search;

