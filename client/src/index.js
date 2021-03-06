import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./style/theme";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ContextProviders from "./contexts";
import client from "./lib/with-graphql";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContextProviders>
        <ThemeProvider theme={theme}>
          <App />
          <CssBaseline />
        </ThemeProvider>
      </ContextProviders>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
