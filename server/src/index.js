import http from 'http';
import express from 'express';
const request = require('request');

import { getRandomTriplet } from './Triplets';

const app = express();

const server = http.createServer(app);

app.get('/api/triplet', (req, res) => {
  const randomTriplet = getRandomTriplet();
  res.json(randomTriplet);
});

app.get('/api', (req, res) => {
  res.json({ message: 'Nothing to see here' }); 
});

// An HTTP proxy method for content that blocks deep linking
app.get('/api/proxy', (req, res) => {
  const { url } = req.query;
  request.get(url).pipe(res);
});

server.listen(5000, () => 
  console.log('API running on port 5000'));