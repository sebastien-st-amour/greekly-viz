

const axios = require('axios');
const NodeCache = require('node-cache');
const url = require('url');


const tokenCache = new NodeCache({ stdTTL: 60 * 60 * 24 });

const fetchToken = async () => {
  
  try {
    
    const token = await axios.post(`${process.env.GREEKLY_API_URL}/api/login`, {
      email: process.env.GREEKLY_API_USER,
      password: process.env.GREEKLY_API_PASSWORD
    });

    tokenCache.set('token', token.data.access_token, 60 * 60 * 24);
    
    return token.data.access_token;
  
  } catch (error) {
    console.log(error);
  }
}

const fetchStocks = async (req, res) => {

  try {
    
    const token = await tokenCache.get('token') || await fetchToken();

    const data = await axios.get(`${process.env.GREEKLY_API_URL}/api/stocks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    res.json(data.data);
  
  } catch (error) {

    if (error.response.status === 401) {
      
      const token = await fetchToken();
      
      return await fetchStocks();
    
    }
    console.log(error);
  }
}

const fetchOptionContracts = async (req, res) => {


  try {

    const token = await tokenCache.get('token') || await fetchToken();

    const params = url.parse(req.url, true).search;

    const data = await axios.get(`${process.env.GREEKLY_API_URL}/api/option_contracts${params}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    res.json(data.data);

  } catch (error) {

    if (error.response.status === 401) {

      const token = await fetchToken();

      return await fetchOptionContracts();

    }
    console.log(error);
  }
}

module.exports = {
  fetchToken,
  fetchStocks,
  fetchOptionContracts
}