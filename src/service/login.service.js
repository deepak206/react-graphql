import { fetchQuery } from 'relay-runtime';
import environment from "../relay/environment";
import graphql from "babel-plugin-relay/macro";

const LOGIN_URL = '/api/auth';

/**
 * Login to SAM
 * @param username the username/email to login
 * @param password obviously the password
 * @returns {Promise<any>}
 *
 * This method returns an object which contains a tokenId. Pass this tokenId to loginUsingSSOToken to get access_token
 */
export const loginToSAM = (username, password) => {
  return fetch(LOGIN_URL, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'X-OpenAM-Username': username,
      'X-OpenAM-Password': password,
    },
    method: 'POST'
  }).then((response) => response.json()).then((responseJson) => {
    if (responseJson && (responseJson.error || responseJson.errors)) {
      throw (JSON.stringify(responseJson.errors ? responseJson.errors[0] : responseJson));
    }

    if (!('tokenId' in responseJson)) return responseJson;

    const { tokenId } = responseJson;

    return loginToOAE(tokenId);
  });
};

/**
 * This a graphQl endpoint which logs in the user using the token obtained from the above method
 * @param token
 */
export const loginToOAE = (token) => {
  const variables = { token };

  const query = graphql`
      query loginQuery($token: String) {
          loginUsingSSOToken(pearsonExtSTGSSOSession: $token)
      }
  `;

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  });
};
