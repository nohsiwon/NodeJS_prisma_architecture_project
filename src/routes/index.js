const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const apiRouter = express.Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
