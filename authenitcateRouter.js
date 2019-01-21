const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const router = express.Router();

module.exports = router;

const db = require('./database/db.js');


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

    db('users').where({ username: creds.username }).first().then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)){
            res.status(200).json({msg:'welcome'});
        }else{
            res.status(401).json({msg: 'you shall not pass!'});
        }
    })
    .catch(err => res.json(err))
})


router.get('/users', (req, res) => {
    db('users')
    .select('id', 'username', 'password')
    .then( users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})