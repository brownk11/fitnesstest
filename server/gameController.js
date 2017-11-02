const express = require("express");
const game = require("./gameObject");

const router = express.Router();

router
    .get("/exercises", (req, res) => res.send(game.exercises))
    


module.exports.router = router;