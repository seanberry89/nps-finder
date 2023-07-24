import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import AppTheme from './theme/AppTheme';
import ParkState from './context/ParkState';

// Note: removing StrictMode is a temp workaround for the Google Maps API issue:
// WebGl TypeError: cannot read properties of null (reading indexOf)
// Reference 1: https://github.com/JustFly1984/react-google-maps-api/issues/3095
// Reference 2: https://github.com/google-map-react/google-map-react/issues/1129

const container = document.getElementById('root');

const root = createRoot(container);

root.render(

  <StrictMode>
    <AppTheme>
      <ParkState>
        <App />
      </ParkState>
    </AppTheme>
  </StrictMode>

);
