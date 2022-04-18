const express = require('express');
const router = express.Router();
const User = require('../models/user')
const verifyToken = require('../libs/verifyToken')
const exercises = require("../data/exercises.json")


router.get("/exercises", verifyToken, async (req, res) => {
    res.status(200).send(exercises)
})

module.exports = router
