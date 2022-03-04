const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const dotenv = require("dotenv")

dotenv.config()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



// Put all API endpoints under '/api'
app.get('/api/stocks', async (req, res) => {

  console.log('api url: ', process.env.GREEKLY_API_URL);

  try {

    const token = await axios.post(`${process.env.GREEKLY_API_URL}/api/login`, {
      email: process.env.GREEKLY_API_USER,
      password: process.env.GREEKLY_API_PASSWORD
    });
  
    console.log('token: ', token.data.access_token);
  
    const data = await axios.get(`${process.env.GREEKLY_API_URL}/api/stocks`, {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`
      }
    })

    console.log('data: ', data.data);

    res.json(data.data);

  } catch (error) {
    console.log(error);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Password generator listening on ${port}`);