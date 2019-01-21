const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const authenticateRouter = require('./routers/authenitcateRouter.js');
const restrictedRoute = require('./routers/restrictedRouter.js');

const server = express();

server.use(
    session({
      name: 'notsession', // default is connect.sid
      secret: 'nobody tosses a dwarf!',
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: true, // only set cookies over https. Server will not send back a cookie over http.
      }, // 1 day in milliseconds
      httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
      resave: false,
      saveUninitialized: false,
    }));
server.use(express.json());
server.use(morgan('short'));

server.use('/api', authenticateRouter);
server.use('/api/restricted', restrictedRoute);

server.get('/', (req, res) => {
    req.session.name = 'frodo';
    console.log(req.session)
    res.send(`got it`)
})

server.get('/greet', (req, res) => {
    const name = req.session.name;
    console.log(req.session)
    res.send(`oi ${req.session.name}`)
})

server.listen(6000, () => console.log('server up on 6000'));