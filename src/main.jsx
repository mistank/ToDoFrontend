import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './components/Root.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="475333913577-7rn6k16ke8c9nbr2qru3mv5mimppkt1d.apps.googleusercontent.com">
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
