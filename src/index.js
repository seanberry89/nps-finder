import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import AppTheme from './theme/AppTheme';
import AdventureState from './context/AdventureState';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(

  <React.StrictMode>
    <AppTheme>
      <AdventureState>
        <App />
      </AdventureState>
    </AppTheme>
  </React.StrictMode>

);
