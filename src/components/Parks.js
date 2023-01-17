import React, { Fragment, useContext } from 'react';
import { Box, Grid } from '@mui/material';

import ParkItem from './ParkItem';
import Loader from './Loading';

import AdventureContext from '../context/adventureContext';

const Parks = () => {

  const adventureContext = useContext(AdventureContext);

  const { parks, loading } = adventureContext;

  let items = parks.data;

  if(loading){

    return <Loader />

  } else {

    return (
      <Fragment>
        { loading ? ( <Loading /> ) : ( <Box>
          <Grid container>
            { items && items.map((item) => (
              <Grid key={item.id} item>
                <ParkItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Box> ) }
      </Fragment>
    )
  }
}

export default Parks;
