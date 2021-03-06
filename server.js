const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const apis = require("./apis");

const app = express();

// Allow cross-origin
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/apis", apis, (error, req, res, done) => {
  console.log("ROUTE ERR", error);
  return res.sendStatus(500);
});

app.use(express.static(path.join(__dirname, "client", "build")));

// Handle React routing, return all requests to React app
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
