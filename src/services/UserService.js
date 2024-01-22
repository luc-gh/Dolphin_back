const user = require('../models/User');
const express = require('express');
const router = express.Router();

router.get("/user", (req, res, next) => {
    res.send("API em funcionamento!");
});

module.exports = router;