require("dotenv").config();

const axios = require("axios");
const express = require("express");
const _ = require("lodash");

const router = express.Router();

const baseUrl = "https://sandbox-api.brewerydb.com/v2";

router.post("/api", (req, res, next) => {
  try {
    const { route, query } = req.body;
    const q = query ? `&q=${query}` : "";
    //
    axios
      .get(`${baseUrl}/${route}/?key=${process.env.BREW_API_KEY}${q}`)
      .then(r => {
        res.json(_.get(r, "data.data", "")).status(200);
      });
  } catch (e) {
    console.log({ e });
    res.json(e).status(500);
  }
});

module.exports = router;
