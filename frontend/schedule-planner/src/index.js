import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-h1c2gwh7xh4mapew.us.auth0.com"
    clientId="sF60D1sotalrMLZio5j3lmN7XyTJ7DBP"
    authorizationParams={{
      redirect_uri: "http://143.198.48.114:3000/roadmap",
      audience: "http://143.198.48.114:8080",
      scope: "openid profile email"
    }}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
