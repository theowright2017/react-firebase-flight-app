// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
import {BrowserRouter as Router} from 'react-router-dom';
//
// ReactDOM.render(
// <Router>
//   <App />
// </Router>, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();







// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";

// static defaultProps = {
//   email: this.props
// }

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
>
  <Router>
    <App />
  </Router>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
