import React, { useState, useContext } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

import AdventureContext from '../context/adventureContext';

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const Search = ({ panTo }) => {

  const adventureContext = useContext(AdventureContext);

  const { searchAdventure, setAlert } = adventureContext;

  const [text, setText ] = useState('');


  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 44.3386, lng: () => -68.2733 },
      radius: 3000
    }
  });

  const handleClick = async (value) => {

    // update value to the user selection
    setValue(value, false);

    // clear other listed suggestions
    clearSuggestions();

    // convert the user's selection of address data into coordinates
    const results = await getGeocode({
      address: value
    });

    // extract the coordinates from the first result of the user search
    const { lat, lng } = getLatLng(results[0]);

    console.log({ lat, lng });

    panTo({ lat, lng });

  }

  // submit the user's text from the form button
  const onSubmit = (e) => {
    if(text === ''){

      setAlert('please enter a destination');

    } else {

      searchAdventure(text);
      setText('');

    }

    e.preventDefault();
  }

  // selects the value of the typed text
  const onChange = (e) => {

    setText(e.target.value);

  }

  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Combobox>
            <ComboboxInput value={value} disabled={!ready} placeholder="search for an adventure" />
            <ComboboxPopover>
              <ComboboxList>
                { status === "OK" &&
                  data.map(({place_id, description}) => (
                    <ComboboxOption key={place_id} value={description} onClick={() => {}} />
                )) }
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
          <Box component="form" onSubmit={onSubmit}>
            <TextField value={text} onChange={onChange} />
            <Button type="submit" sx={{ my: 1 }} variant="contained">Find Adventure</Button>
          </Box>
        </Stack>
    </Box>
  )
}

export default Search;
