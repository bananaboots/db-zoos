const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const knexConfig = require('./knexfile.js');

const server = express();

server.use(express.json());
server.use(helmet());

// connect to database
const db = knex(knexConfig.development);

// endpoints here
server.get('/', (req, res) => {
  res.send('api working')
});

// list zoos

// add zoo

// update zoo

// delete zoo

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
