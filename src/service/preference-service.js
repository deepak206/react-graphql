import { fetchQuery } from 'relay-runtime';
import environment from "../relay/environment";
import graphql from "babel-plugin-relay/macro";

export const getLearnerPreference = (id) => {
  const variables = { id };
  const query = graphql`
    query preferenceServiceGetQuery($id: String!) {
        learner(id: $id){
            showTaskListWalkthrough,
            showDashboardWalkthrough,
            locale,
        }
    }
  `;

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  });
};

export const updateLearnerPreference = (id, markDashboardWalkThroughComplete, markTaskListWalkThroughComplete) => {
  const variables = { id };
  const dashboardQuery = graphql`
        query preferenceServiceDashboardUpdateQuery($id: String!) {
            learner(id: $id){
                markDashboardWalkThroughComplete,
                showDashboardWalkthrough
            }
        }
    `;

  const taskListQuery = graphql`
        query preferenceServiceTaskListUpdateQuery($id: String!) {
            learner(id: $id){
                markTaskListWalkthroughComplete,
                showTaskListWalkthrough
            }
        }
    `;

  const noUpdationQuery = graphql`
        query preferenceServiceNoUpdateQuery($id: String!) {
            learner(id: $id){
                id
            }
        }
    `;

  const query = markDashboardWalkThroughComplete ? dashboardQuery : (markTaskListWalkThroughComplete ? taskListQuery : noUpdationQuery);

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  });
};
