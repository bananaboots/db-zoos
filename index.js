const express = require('express');
const configMiddleware = require('./config/middleware.js');

const knex = require('knex');
const knexConfig = require('./knexfile.js');

const server = express();

// apply middleware
configMiddleware(server);

// connect to database
const db = knex(knexConfig.development);

// generic 500 error handler
const errorHandler = (err) => res.status(500).json({
    message: 'Sorry, an error occurred while handling your request',
    error: err
  });

// endpoints start here

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
    const zoo = await db('zoos')
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
    const id = await db('zoos')
      .insert({ name })
      .into('zoos');
    res.status(201).json(id);
  } catch (err) {
    errorHandler(err);
  }

});

// update zoo
server.put('/api/zoos/:id', async (req, res) => {
  
  const changes = req.body;

  try {
    const updatedZoo = await db('zoos')
      .where({ id: req.params.id })
      .update(changes);
    res.status(201).json(updatedZoo);
  } catch (err) {
    errorHandler(err);
  }
  
});

// delete zoo
server.delete('/api/zoos/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const deletedCount = await db('zoos')
      .where('id', id)
      .del();
    if (deletedCount === 1) {
      res.status(200).json(deletedCount);
    } else {
      res.status(404).json({
        message: 'Sorry, the zoo with this ID could not be found.'
      });
    }
  } catch (err) {
    errorHandler(err);
  }

});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
