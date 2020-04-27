import React, { useState } from "react";

import useStyles from "./styles";

export default function Home() {
  const classes = useStyles();
  const [test, setTest] = useState("test value");

  // console.log({ test });

  return (
    <div className={classes.root}>
      <div>Home</div>
      <div>Search here</div>
    </div>
  );
}
