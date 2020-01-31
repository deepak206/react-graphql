import { fetchQuery } from 'relay-runtime';
import environment from "../relay/environment";
import graphql from "babel-plugin-relay/macro";

/**
 * This a graphQl endpoint which logs out user form OAE
 */
export const getActiveLearnerService = (organizationId) => {

  const variables = { organizationId };

  const query = graphql`
  query adminDashboardDataServiceQuery($organizationId: String!) {      
    activatedUsers(organizationId: $organizationId)
  }
`;

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  }).catch((error) => {
    return false;
  }) ;
};