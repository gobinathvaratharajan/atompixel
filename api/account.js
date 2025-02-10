const express = require('express');
const config = require('config');
const throttle = config.get('throttle');
const limiter = require('express-rate-limit');
const accountController = require('../controller/accountController');
const api = express.Router();

// Error handling
const use = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

api.post(
    '/api/account',
    limiter(throttle.signup),
    use(accountController.create),
);

api.get('/api/account', use(accountController.get));

api.delete('/api/account', use(accountController.close));

module.exports = api;
