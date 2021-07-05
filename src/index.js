import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from "aws-amplify";
import config from "./config/AWSConfig";
import { BrowserRouter as Router } from 'react-router-dom';

const oauth = {
  domain: config.cognito.DOMAIN,
  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
  redirectSignIn: config.cognito.SIGNIN_REDIRECT_URL,
  redirectSignOut: config.cognito.SIGNOUT_REDIRECT_URL,
  responseType: 'code'
};

Amplify.configure({
  Auth: {
    oauth: oauth,
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    federationTarget: "COGNITO_USER_POOLS",
  },
  API: {
    endpoints: [
      {
        name: "countdown",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
