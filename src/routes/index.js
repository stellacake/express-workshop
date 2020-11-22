const express = require("express");
const router = express.Router();

const characters = require("./characters");

router.use("/characters", characters);

module.exports = router;
