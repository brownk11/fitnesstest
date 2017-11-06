const express = require("express");
const tracker = require("./trackerObject");

const router = express.Router();


router
    .get("/exercises", (req, res) => res.send(tracker.exercises))
    


module.exports.router = router;