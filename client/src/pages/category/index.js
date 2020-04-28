import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import useStyles from "./styles";

import { CategoryContext } from "../../contexts/category";
import styles from "../../store/styles";

export default function Category() {
  const classes = useStyles();
  const { category } = useContext(CategoryContext);
  const { categoryId } = useParams();

  console.log({ styles });

  useEffect(() => {
    const axiosRes = axios
      .post("http://localhost:5000/apis/brew/api", {
        route: `/styles`
      })
      .then(res => {
        return console.log({ res });
      });
  }, [categoryId]);

  return (
    <div className={classes.root}>
      <div>Category</div>
      <div>Details Here</div>
    </div>
  );
}
