const express = require('express');

const router = express.Router();
const protected = require('../middleware/customMiddlewar.js');

module.exports = router;

const db = require('../database/db.js');

router.get('/', protected, (req, res) => {
    res.send('Take no thought for the morrow. For the morrow shall take thought for the things of itself')
})