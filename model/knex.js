const knex = require('knex');
// checking the env running
const knexFile = require('../knexfile')[process.env.NODE_ENV || 'development'];

module.exports = (settings) => {
    if (!settings) settings = knexFile;
    return new knex(settings);
};
