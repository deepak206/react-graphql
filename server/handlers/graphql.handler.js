const client = require('../config/axios.config');

// eslint-disable-next-line no-var
var exports = module.exports = {};

exports.graphQLHandler = (req, res) => {
  const start = req.headers['x-request-time'];
  const { headers } = req;

  // This is to overcome `ERR_TLS_CERT_ALTNAME_INVALID` as *.pearson.com certs does not contain localhost
  // This is to overcome Hostname/IP does not match certificate's altnames: IP: 127.0.0.1 is not in the cert's list:
  // eslint-disable-next-line no-unused-expressions
  headers.host.includes('localhost') || headers.host.includes('127.0.0.1:8090') ? delete headers.host : null;
  console.log("Forwarding to Server", Date.now() - start);
  return client({
    method: 'post',
    headers,
    data: req.body,
  }).then((axiosRes) => {
    const end = Date.now();

    res.set('x-req-start', start)
      .set('x-res-end', end)
      .set('x-response-time', end - start)
      .set(axiosRes.headers)
      .send(axiosRes.data)
  }).catch((error) => {
    res.send({ error });
  });
};
