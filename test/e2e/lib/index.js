const supertest = require('supertest');
const debug = require('debug')('rs:lib');

const routes = require('./routes');

const host = 'localhost:4000';
debug('HOST', host);

const request = supertest(host);

module.exports = {
  request,
  routes
};
