const express = require('express');


const router = express.Router();
const middleWare = require('../middleware/customMiddlewar.js');

module.exports = router;

const db = require('../database/db.js');

router.get('/',(req, res) => {
    res.send(`oi ${req.session.name}`)
})