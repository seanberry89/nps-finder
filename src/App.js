import { Fragment } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { flexColumn } from './theme/CustomTheme';

import './App.css';

import Nav from './components/nav/Nav';
import Map from './components/map/Map';
import Footer from './components/footer/Footer';

// const Map = lazy(() => import('./test/Map'));
// const Nav = lazy(() => import('./components/Nav'));
// const Footer = lazy(() => import('./components/Footer'));

function App() {

  return (
    <Fragment>
      <CssBaseline />
      <Box sx={flexColumn}>
        <Nav />
        <Map />
        <Footer />
      </Box>
    </Fragment>
  );
}

export default App;
