import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Raleway",
      textTransform: "none"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          color: "#fff",
          textTransform: "capitalize"
        },
        disableRipple: true
      },
      variant: "text"
    }
  }
});

const AppTheme = (props) => {
  return (
    <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
  );
};

export default AppTheme;
