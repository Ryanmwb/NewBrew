require("dotenv").config();

const axios = require("axios");
const express = require("express");
const _ = require("lodash");

const router = express.Router();

const baseUrl = "https://sandbox-api.brewerydb.com/v2";

router.post("/api", async (req, res, next) => {
  try {
    const { route, query } = req.body;
    const q = query
      ? `&q=${query}&type=beer&withBreweries=Y&withGuilds=Y&withIngredients=Y&withSocialAccounts=Y`
      : "";
    //
    const axiosResponse = axios.get(
      `${baseUrl}/${route}/?key=${process.env.BREW_API_KEY}${q}`
    );

    res.json(_.get(axiosResponse, "data.data", "")).status(200);
  } catch (e) {
    console.log({ e });
    res.json(e).status(500);
  }
});

module.exports = router;
