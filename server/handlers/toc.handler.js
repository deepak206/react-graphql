const axios = require('axios');
const Hawk = require('@hapi/hawk');

// eslint-disable-next-line no-var
var exports = module.exports = {};

const { URL, KEYCHAIN } = require('../environment');
const { courseInstanceId } = KEYCHAIN;

console.log(KEYCHAIN);
const credentials = {
  id: KEYCHAIN.tenantHawkId,
  key: KEYCHAIN.tenantHawkSecret,
  algorithm: 'sha256'
};

function get(url, headers = {}) {
  headers["productModelId"] = KEYCHAIN.product_model_id;
  headers["x-api-key"] = KEYCHAIN.api_key;
  headers["Content-Type"] = "application/json";
  headers["Accept"] = "*/*";
  headers["Accept-Encoding"] = "gzip, deflate";
  return axios.get(`${url}`, { headers });
}

function post(url, headers = {}) {
  headers["productModelId"] = KEYCHAIN.product_model_id;
  headers["x-api-key"] = KEYCHAIN.api_key;
  headers["Accept"] = "*/*";
  headers["Accept-Encoding"] = "gzip, deflate";
  return axios({ method: 'post', url, headers });
}

function generateHawk(url, method = 'POST') {
  const timeStamp = (Math.trunc(Date.now() / 1000));
  const options = { credentials, timeStamp };
  const { header } = Hawk.client.header(url, method, options);

  return header;
}

exports.getCourseInstance = (req, res) => {
  return get(`${URL.SAM_BASE_URL + URL.COURSE_API}/v1/course-instance/${courseInstanceId}`)
    .then(({ data }) => res.send(data))
    .catch((error) => {
      console.log(error.response.data);
      res.send({ error })
    })
};

exports.getLevels = (req, res) => {
  const url = `${URL.SAM_BASE_URL + URL.TOC_API}/v1/toc/${req.params['tocId']}/nodes/fetch`;

  return post(url, { "Authorization": generateHawk(url) })
    .then(({ data }) => res.send(data))
    .catch((error) => {
      console.log(error.response.data);
      res.send(error.response.data)
    })
};

function getNodes(req, res){
  const url = `${URL.SAM_BASE_URL + URL.TOC_API}/v1/toc/${req.params['tocId']}/node/${req.params['nodeId']}/fetch`;

  return post(url, { "Authorization": generateHawk(url) })
    .then(({ data }) => res.send(data))
    .catch((error) => {
      console.log(error.response.data);
      res.send(error.response.data)
    })
}

exports.getModuleInLevel = (req, res) => {
  return getNodes(req, res);
};

exports.getTasksInModule = (req, res) => {
  return getNodes(req, res);
};

exports.getTaskData = (req, res) => {
  return getNodes(req, res);
};

exports.getAssetFromARS = (req, res) => {
  const url = `${URL.ARS_API}/v3/pulse/asset/fetch?limit=50&returnTotalCount=true`;

  console.log('Request Body', req.body);
  const payload = {
    "assetIds": [ ...req.body ],
    "contexts": [ {
      "cId": "global",
      "cType": "global"
    } ] };

  return axios.post(url, payload, { headers: { "Authorization": generateHawk(url) } })
    .then(({ data }) =>  res.send(data))
    .catch((error) => {
      console.log("Asset response error", error);
      return res.send(error);
    });
};

exports.launchAsset = (req, res) => {
  const { assetId, userId, appVersion, deviceId }= req.body;

  const assetUrl = `${URL.ARS_API}/v2/launch/asset?assetid=${assetId}&userid=${userId}&appversion=${appVersion}&deviceid=${deviceId}`;

  console.log("URL", assetUrl);

  return axios.get(assetUrl, { headers: { "Authorization": generateHawk(assetUrl, 'GET') } })
    .then(({ data }) =>  res.send(data))
    .catch((error) => {
      console.log("Asset response error", error.response);
      return res.send(error.response.data);
    });
};

exports.launchHtmAsset = (req, res) => {
  const { resourceUrl } = req.body;

  console.log('Request URL', resourceUrl);
  return axios.get(resourceUrl).then(( { data }) => res.send(data))
    .catch((error) => {
      console.log("Asset response error", error.response);
      return res.send(error.response.data);
    });
};
