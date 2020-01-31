const ENV = require("../environment");

const axios = require('axios');

const axiosConfig = axios.create({
  baseURL: ENV.URL.GRAPHQL_URL,
  headers: {
    'x-api-key': ENV.KEYCHAIN.api_key
  }
  /* other custom settings */
});

module.exports = axiosConfig;
