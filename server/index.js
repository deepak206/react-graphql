const express = require('express');
const path = require('path');
const helmet = require('helmet');
const loginHandler = require('./handlers/login.handler');
const { graphQLHandler } = require("./handlers/graphql.handler");
const  { getHmacForCAASResource } = require("./handlers/cass.handler");
const { launchHtmAsset } = require("./handlers/toc.handler");
const app = express();

/**
 * Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

 Helmet is actually just a collection of smaller middleware functions that set security-related HTTP response headers:

 csp sets the Content-Security-Policy header to help prevent cross-site scripting attacks and other cross-site injections.
 hidePoweredBy removes the X-Powered-By header.
 hpkp Adds Public Key Pinning headers to prevent man-in-the-middle attacks with forged certificates.
 hsts sets Strict-Transport-Security header that enforces secure (HTTP over SSL/TLS) connections to the server.
 ieNoOpen sets X-Download-Options for IE8+.
 noCache sets Cache-Control and Pragma headers to disable client-side caching.
 noSniff sets X-Content-Type-Options to prevent browsers from MIME-sniffing a response away from the declared content-type.
 frameguard sets the X-Frame-Options header to provide clickjacking protection.
 xssFilter sets X-XSS-Protection to enable the Cross-site scripting (XSS) filter in most recent web browsers.
 */
app.use(helmet());
console.log('Directory is', __dirname);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../build')));

// Tracking how much time diff between the request and response
app.use((req,res,next) => {
  req.headers['x-request-time'] = Date.now();
  next();
});

// We don't have to handle anything here. Proxy it to FR
app.post('/api/auth', loginHandler.loginToFR);
// DEPRECATED
// app.get('/api/getCourseInstance', tocHandler.getCourseInstance);

// DEPRECATED
// app.get('/api/getLevels/:tocId', tocHandler.getLevels);

// DEPRECATED
// app.get('/api/getModule/:tocId/modules/:nodeId', tocHandler.getModuleInLevel);

// DEPRECATED
// app.get('/api/getModule/:tocId/tasks/:nodeId', tocHandler.getTasksInModule);

app.use(express.json());
// DEPRECATED
// app.post('/api/getAssets/', tocHandler.getAssetFromARS);
// DEPRECATED
// app.post('/api/launchAsset/', tocHandler.launchAsset);

app.get('/info', (req, res) => {
  res.send('Service Up: ' + new Date());
});

// Generate HMAC signature for CaaS secured resource
app.get('/api/generateHmac', getHmacForCAASResource);

app.post('/api/htmResource', launchHtmAsset);

// Proxy for all graphql apis
app.use('/graphql', graphQLHandler);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`OAE Frontend server listening on ${port} @ `, new Date());
