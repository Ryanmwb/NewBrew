import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import _ from "lodash";

import { CategoriesContext } from "./contexts/categories";
import logo from "./logo.svg";
import "./App.css";

function App(props) {
  const categoriess = useContext(CategoriesContext);

  const [calledApi, setCalledApi] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (calledApi) return;
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {categories.map(category => (
          <div key={category.name}>{category.name}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
