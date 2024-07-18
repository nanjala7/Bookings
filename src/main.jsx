import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import  {AppointmentProvider}  from '@/context/AppointmentContext';

const theme = {
  colorScheme: 'light',
  // Add your custom theme properties here
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    <AppointmentProvider> {/* Wrap App with AppointmentProvider */}
        <App />
    </AppointmentProvider>
  </MantineProvider>,
);