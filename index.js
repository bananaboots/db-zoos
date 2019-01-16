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
server.get('/api/zoos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const zoo = await db
      .select()
      .from('zoos')
      .where('id', id);
    res.status(200).json(zoo);
  } catch (err) {
    errorHandler(err);
  }
});

// add zoo
server.post('/api/zoos', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      message: 'Please provide a name.'
    })
  }

  try {
    const id = await db
      .insert({ name })
      .into('zoos');
    res.status(201).json(id);
  } catch (err) {
    errorHandler(err);
  }
});

// update zoo

// delete zoo

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
