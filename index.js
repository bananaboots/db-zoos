const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const knexConfig = require('./knexfile.js');

const server = express();

server.use(express.json());
server.use(helmet());

const errorHandler = (err) => res.status(500).json({
    message: 'Sorry, an error occurred while handling your request',
    error: err
  });

// connect to database
const db = knex(knexConfig.development);

// endpoints here

// list zoos
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos);
  } catch (err) {
    errorHandler(err);
  }
});

// get zoo by ID

// add zoo

// update zoo

// delete zoo

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
