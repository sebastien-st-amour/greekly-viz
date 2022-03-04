const express = require('express');
const path = require('path');

const app = express();
const dotenv = require("dotenv");

dotenv.config()

const greekly = require('./services/greekly');

app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/stocks', greekly.fetchStocks);
app.get('/api/option_contracts*', greekly.fetchOptionContracts);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Password generator listening on ${port}`);