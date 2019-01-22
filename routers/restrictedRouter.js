const express = require('express');

const router = express.Router();

module.exports = router;

const db = require('../database/db.js');

router.get('/', (req, res) => {
    res.send('Take no thought for the morrow. For the morrow shall take thought for the things of itself')
})

router.get('/users', async (req, res) => {
    const users = await db('users');

	res.status(200).json(users);
})