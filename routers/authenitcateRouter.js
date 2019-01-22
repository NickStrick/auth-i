const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

module.exports = router;

const db = require('../database/db.js');
const protected = require('../middleware/customMiddlewar.js');


router.post('/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14)

    creds.password = hash;

    db('users').insert(creds).then(ids => {
        res.status(201).json(ids);
    }).catch(err => res.json({err, msg: 'woops'}))
})


router.post('/login', (req, res) => {
    const creds = req.body;

	db('users').where({username: creds.username }).first()
	.then(user => {
		if(user && bcrypt.compareSync(creds.password, user.password)) {
			req.session.user = user;
			res.status(200).json({msg: `welcome ${user.username}`});
		}else{
			res.status(401).json({you: 'shall not pass'})
		}
	})
})

router.get('/logout', (req, res) => {
    if(req.session && req.session.user) {
		req.session.destroy(err => {
			if(err){
				res.status(500).json({err, msg: 'you cant leave'})
			}else{
				res.status(200).send('bye bye')
			}
		});
	}else{
		res.json({msg: 'not logged in'})
	}
})


router.get('/users', protected, async (req, res) => {
    const users = await db('users');

	res.status(200).json(users);
})

