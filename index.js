const express = require('express');
const morgan = require('morgan');

const authenticateRouter = require('./authenitcateRouter.js');

const server = express();

server.use(express.json());
server.use(morgan('short'));

server.use('/api', authenticateRouter);

server.listen(6000, () => console.log('server up on 6000'));