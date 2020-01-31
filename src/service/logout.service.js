import { fetchQuery } from 'relay-runtime';
import environment from "../relay/environment";
import graphql from "babel-plugin-relay/macro";

/**
 * This a graphQl endpoint which logs out user form OAE
 */
export const logoutFromOAE = () => {
  const query = graphql`
        query logoutQuery {
            logOut
        }
    `;

  return fetchQuery(environment, query).then((res) => {
    return res;
  });
};