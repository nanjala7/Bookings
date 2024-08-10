const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // create a router for the db.json file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});
// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const GOOGLE_MAPS_API_KEY = 'AIzaSyCy5GovA803gr57jPSKSc-xbCehnhttMks'; // Replace with your actual API key

app.get('/api/distance', async (req, res) => {
  const { origins, destinations } = req.query;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins,
        destinations,
        key: GOOGLE_MAPS_API_KEY,
        mode: 'driving',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Google Maps API:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${3001}`);
});
