import http from 'http';
import express from 'express';

import { getRandomTriplet } from './Triplets';

const app = express();

const server = http.createServer(app);

app.get('/api/triplet', (req, res) => {
  const randomTriplet = getRandomTriplet();
  res.json(randomTriplet);
});

app.get('/api', (req, res) => {
  res.json({ hello: 'world' }); 
});

server.listen(5000, () => 
  console.log('API running on port 5000'));