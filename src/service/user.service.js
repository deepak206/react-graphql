import { fetchQuery } from 'relay-runtime';
import environment from "../relay/environment";
import graphql from "babel-plugin-relay/macro";

export const getUserData = (id) => {
  const variables = { id };
  const query = graphql`
      query userQuery($id: String!) {
          user(id: $id){
            userId,
            email,
            primaryRole,
            firstName,
            lastName
          }
      }
  `;

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  });
};

export const getLoggedInUser = () => {
  const query = graphql`
      query userLoggedInQuery{
          getLogedInUser(getAllRequired: true){
              userId,
              email,
              primaryRole,
              firstName,
              lastName
          }
      }
  `;

  return fetchQuery(environment, query).then((res) => res);
};
