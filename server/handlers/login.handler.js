const axios = require('axios');
const ENV = require('../environment');

// eslint-disable-next-line no-var
var exports = module.exports = {};

exports.loginToFR = (req,res) => {
  const { headers } = req;

  // This is to overcome `ERR_TLS_CERT_ALTNAME_INVALID` as *.pearson.com certs does not contain localhost
  // This is to overcome Hostname/IP does not match certificate's altnames: IP: 127.0.0.1 is not in the cert's list:
  // eslint-disable-next-line no-unused-expressions
  headers.host.includes('localhost') || headers.host.includes('127.0.0.1:8090') ? delete headers.host : null;
  return axios({
    method: 'post',
    url: ENV.URL.FORGEROCK_URL,
    headers,
  }).then(({ data }) => {
    return res.send(data);
  }).catch((error) => {
    console.log(error);
    res.status(401).send({ error })
  })
};
