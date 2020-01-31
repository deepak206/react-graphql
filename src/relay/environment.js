import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const isMutation = (request) => request.operationKind === 'mutation';
// return user auth token
const getToken = () => localStorage.getItem('YXV0aFRva2Vu');

const errorMessages = ['User not authenticated, valid Authorization header required',
  'Token is expired', 'Access is denied'];

const errorCheck = (value) => errorMessages.some(element => value.includes(element));

const fetchFunction = async (request,variables,cacheConfig, uploadables) => {
  const body = JSON.stringify({
    query: request.text, // GraphQL text from input
    variables,
  });

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    crossDomain: true,
    'originatorId': 'IN01'
  };
  // Add auth header only if token is present in localStorage
  if (getToken()) {
    headers.authorization = `Bearer ${getToken()}`;
  }

  // TODO: Clean this up
  const response = await fetch('/graphql', {
    method: 'POST',
    credentials: 'include',
    withCredentials: 'true',
    body, headers
  });

  if('status' in response && (response.status === 502 || response.status === 503))
  {
    // ToDo
    return response;
  }
  const data = await response.json();

  // Logout if token is expired or access is denied
  if ((data.errors && errorCheck(data.errors[0].message))){
    console.log('Error');
    localStorage.clear();
    document.location = '/';
  }

  if (isMutation(request) && (data.error || data.errors)) {
    throw (JSON.stringify(data.errors ? data.errors[0] : data));
  }
  return data;

  // try {
  //   const response = await axios({
  //     url: '/graphql',
  //     method: 'post',
  //     headers,
  //     data: body,
  //     withCredentials: true
  //   });
  //   return response.data;
  // } catch (e) {
  //     console.error(e);
  // }
};

const environment = new Environment({
  network: Network.create(fetchFunction),
  store: new Store(new RecordSource()),
});

export default environment;
