const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const authenticateRouter = require('./routers/authenitcateRouter.js');
const restrictedRoute = require('./routers/restrictedRouter.js');

const server = express();
const protected = require('./middleware/customMiddlewar.js');

const sessionConfig = 
    {
        name: 'newApp', 
        secret: 'wowowowowowayaya',
        cookie: {
            maxAge: 1000 * 60 * 10,
            secure: false 
        },
        httpOnly: true, 
        resave: false,
        saveUninitialized: false,
    }

server.use(helmet());
server.use(morgan('short'));
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/restricted', protected, restrictedRoute);
server.use('/api', authenticateRouter);

server.listen(6000, () => console.log('server up on 6000'));