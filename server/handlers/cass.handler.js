const ENV = require('../environment');
const crypto = require("crypto");

// eslint-disable-next-line no-var
var exports = module.exports = {};

exports.getHmacForCAASResource = (req,res) => {
  const { userId, timestamp } = req.query;
  const payload = { userId,timestamp };
  const hmac = crypto.createHmac('sha256', ENV.KEYCHAIN.caas_hmac)
    .update(JSON.stringify(payload))
    .digest('hex');

  console.log("HMAC "+ hmac+" generated at "+timestamp+" for user "+userId);
  res.send(`&userId=${userId}&timestamp=${timestamp}&hmac-signature=${hmac}`);
};
