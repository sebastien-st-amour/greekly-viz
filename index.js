const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



// Put all API endpoints under '/api'
app.get('/api/stocks', async (req, res) => {

  const stocks = await fetch('/api/stocks');
  res.json(stocks);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Password generator listening on ${port}`);