import http from 'http';
import express from 'express';
import request from 'request';

import { exists, initDB } from './db/init';
import { insertRating, listRatings } from './db/Rating';
import { getRandomTriplet } from './Triplets';

const app = express();

app.use(express.json());

const server = http.createServer(app);

exists().then(exists => {
  if (!exists)
    initDB();
});

// Returns a random triplet
app.get('/api/triplet', (req, res) => {
  const randomTriplet = getRandomTriplet();
  res.json(randomTriplet);
});

// Records a triplet rating
app.post('/api/rating', (req, res) => {
  const { museum, method, anchor, similar, dissimilar, rating } = req.body;
  const timestamp = new Date().toISOString();

  insertRating({
    museum, method, anchor, similar, dissimilar, rating, timestamp
  });

  res.json({ message: 'Thanks' });
});

app.get('/api/ratings', (req, res) => {
  listRatings().then(result => {
    res.json(result);
  });
});

// Helper proxy method to get around CORS and deep linking blocks
app.get('/api/proxy', (req, res) => {
  const { url } = req.query;
  request.get(url).pipe(res);
});

// The usual is-alive check method
app.get('/api', (req, res) => {
  res.json({ message: 'Nothing to see here' }); 
});

server.listen(5000, () => 
  console.log('API running on port 5000'));