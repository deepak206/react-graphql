import { fetchQuery } from 'relay-runtime';
import environment from "../relay/environment";
import graphql from "babel-plugin-relay/macro";

export const getLearnerData = (id) => {
  const variables = { id };
  const query = graphql`
      query getLearnerDataQuery($id: String!) {
        learner(id: $id){
            userId,
            email,
            course{accessType}
            firstName,
            lastName
          }
      }
  `;

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  }).catch(err=>{
    console.log("Something went wrong")
  });
};