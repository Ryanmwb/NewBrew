const express = require("express");

const Brew = require("./brew");

const router = express.Router();

router.use("/brew", Brew);

module.exports = router;
