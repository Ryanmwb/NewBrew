import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import _ from "lodash";
import { Container, Grid } from "@material-ui/core";

import Home from "./pages/home";
import Category from "./pages/category";
import Sidebar from "./components/sidebar";
import Background from "../src/assets/wood.jpg";

// import "./App.css";

import useStyles from "./app-styles";

function App() {
  const classes = useStyles();
  const routes = [
    {
      path: "/",
      exact: true,
      main: () => <Home />,
      sideBar: true
    },
    {
      path: "/category/:categoryId",
      main: () => <Category />,
      sideBar: true
    }
  ];

  return (
    <div
      className={classes.app}
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Container maxWidth="md">
        <Router>
          <Switch>
            {routes.map((route, index) => {
              function NewComponent() {
                if (_.get(route, "sideBar", "")) {
                  return (
                    <Grid container>
                      <Grid item xs={3}>
                        <Sidebar />
                      </Grid>
                      <Grid item xs={9}>
                        <route.main />
                      </Grid>
                    </Grid>
                  );
                } else {
                  return <route.main />;
                }
              }

              return (
                <Route
                  key={index}
                  path={_.get(route, "path", "")}
                  exact={_.get(route, "exact", false)}
                  children={<NewComponent />}
                />
              );
            })}
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
