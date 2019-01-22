const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const router = express.Router();

module.exports = router;

const db = require('../database/db.js');

router.get('/',(req, res) => {
    console.log(req.session);
    res.send(`oi ${req.session.name}`)
})

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
            req.session.userId = user.id;
            req.session.name = user.username;
            console.log(req.session)
            console.log(req.session.userId)
            console.log(req.session.name)
            res.status(200).json({msg:req.session.name});
        }else{
            res.status(401).json({msg: 'you shall not pass!'});
        }
    })
    .catch(err => res.json(err))
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy( err => {
            if(err) {
                res.send('error logging out');
            }else{
                res.send('good bye');
            }
        })
    }
})


router.get('/users', (req, res) => {
    db('users')
    .select('id', 'username', 'password')
    .then( users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

