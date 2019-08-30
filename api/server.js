const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const apiDoc = path.join(__dirname, '../apidoc');

const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');
const categoriesRouter = require('./categories/categoriesRouter');
const habitsRouter = require('./habits/habitsRouter');
const { restricted } = require('./middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.options('*', cors());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/auth', authRouter);
server.use('/users', /*restricted,*/ usersRouter);
server.use('/categories', /*restricted,*/ categoriesRouter);
server.use('/habits', /*restricted,*/ habitsRouter);

server.use('/docs', express.static(apiDoc));

module.exports = server;
