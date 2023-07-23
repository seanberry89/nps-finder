import { Fragment } from 'react';
import { CssBaseline } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';

import './App.css';

import Nav from './components/header/Nav';
import Map from './components/main/Map';
import Footer from './components/footer/Footer';
import Loader from './components/main/Loading';

function App() {

  const { isLoaded } = useLoadScript({

    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY

  });

  return (
    <Fragment>

      { isLoaded ? (

        <Fragment>
          <CssBaseline />
          <Nav />
          <Map />
          <Footer />
        </Fragment>

      ) : ( <Loader /> ) }

    </Fragment>
  );
};

export default App;
