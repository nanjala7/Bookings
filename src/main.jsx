import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
//import { gapi } from 'gapi-script';
//import { useEffect } from 'react';
import  {AppointmentProvider}  from '@/context/AppointmentContext';
//const clientId ="962343269753-9aehum1a239f5nft3s56o3j8gjj6gt7j.apps.googleusercontent.com"

const theme = {
  colorScheme: 'light',
  // Add your custom theme properties here
};

/*useEffect(()=>{function start(){gapi.client.init({
  clientId: clientId,
  scope:""
})
};

gapi.load('client:auth2',start);
});*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    <AppointmentProvider> {/* Wrap App with AppointmentProvider */}
        <App />
    </AppointmentProvider>
  </MantineProvider>,
);