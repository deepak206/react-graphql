import axios from 'axios';

export const getCasSignature = (userId) => {
  const timestamp = Date.now();

  return axios.get('/api/generateHmac', { params: { userId, timestamp } }).then((res) => res.data);
};

export const getHtmAsset = (url) => {
  return axios.post('/api/htmResource', {
    'resourceUrl': url
  }).then((res) => res.data);
};
