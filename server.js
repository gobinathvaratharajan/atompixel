require('dotenv').config();
const express = require('express');
const config = require('config');
const throttle = config.get('throttle');
const limiter = require('express-rate-limit');
const PORT = process.env.port || 8080;
const app = express();
const api = require('./api');

app.use(express.json());
/* it the middleware to parse url-encoded when submit the form data given true allow us to deep nesting the data
    with the help the of it you can access the data via req.body in form data */
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
// Size limits for security
app.use(express.json({ limit: '10kb' }));

// config rate limiter
app.use('/api', limiter(throttle.api));
app.use(api);

// error handling
app.use(function (err, req, res, next) {
    const message = err.raw?.message || err.message || err.sqlMessage || null;
    console.error(message);
    return res.status(500).send({ message: message });
});

const server = app.listen(PORT, () => {
    console.log(`Welcome to server port: ${PORT}`);
});
