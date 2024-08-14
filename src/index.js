import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from './Component/Auth/Config';

// Create a PublicClientApplication instance





const msalConfig = {
    auth: {
        clientId: config.appId,
        authority: config.authority,
        redirectUri: config.redirectUri
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false//true
    }
};

const pca = new PublicClientApplication(msalConfig);

ReactDOM.render(
    <MsalProvider instance={pca}>
        <App />
    </MsalProvider>,
    document.getElementById('root')
);
