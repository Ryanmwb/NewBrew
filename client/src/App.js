import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import _ from "lodash";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { CategoriesContext } from "./contexts/categories";

// import "./app.css";

function App(props) {
  const categoriess = useContext(CategoriesContext);

  const [calledApi, setCalledApi] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (calledApi) return;
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    console.log({ categoriess });
    axios
      .post(`http://localhost:5000/apis/brew/api`, { route: "/categories" })
      .then(res => {
        setCategories(_.get(res, "data", []));
        setCalledApi(true);
      })
      .catch(e => console.log({ e }));
  });

  return (
    <div className="app">
      {/* {categories.map(category => (
          <div key={category.name}>{category.name}</div>
        ))} */}
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );

  function Home() {
    return <h2>Home</h2>;
  }

  function About() {
    return <h2>About</h2>;
  }

  function Users() {
    return <h2>Users</h2>;
  }
}

export default App;
