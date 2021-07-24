import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  CssBaseline,
  ThemeProvider,
  Snackbar,
} from '@material-ui/core';

import { theme } from './src/theme';
import { Survey } from './src/components';
import { getInitialFormState } from './src/utils';

const App = () => {
  const {
    isSubmitted: initialIsSubmitted = false,
  } = getInitialFormState();

  const [isSubmitted, setIsSubmitted] = useState(initialIsSubmitted);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  // HERE doesnt work
  useEffect(() => {
    if (!initialIsSubmitted && isSubmitted) {
      setIsSnackbarOpen(true);
    }
  }, [isSubmitted]);

  return (
    <div>
      {!isSubmitted ? <Survey setIsSubmitted={setIsSubmitted} /> : null}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        message="Thank you for your feedback!"
      />
    </div>
  );
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#container'),
);
