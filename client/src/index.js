import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { CategoriesContext, categoriesValue } from "./contexts/categories";
import theme from "./style/theme";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

console.log({ CategoriesContext });

ReactDOM.render(
  <React.StrictMode>
    <CategoriesContext.Provider value={categoriesValue}>
      <ThemeProvider theme={theme}>
        <App />
        <CssBaseline />
      </ThemeProvider>
    </CategoriesContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
