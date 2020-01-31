import { fetchQuery } from 'relay-runtime';
import environment from "../relay/environment";
import axios from 'axios';
import graphql from "babel-plugin-relay/macro";

const fetch = (query, variables) => {
  return fetchQuery(environment, query, variables).then((res) => {

    return res;
  }).catch((err) => {
    console.log("Error in fetch query: ", err);
  });
};

export const getModules = () => {
  return axios.get('/module').then((res) => res.data);
};

export const getContent = () => {
  return axios.get('/content').then((res) => res.data);
};

export const getCourseModuleData = (userId) => {
  const variables = { id: userId };

  const query = graphql`
    query dataServiceCourseModuleQuery($id: String!) {
        learner(id: $id){
        course{
            course{
                    id
                    name
                    levels{
                        nodes{
                            id
                            name
                            description
                            modules{
                                nodes{
                                    id
                                    name
                                    thumbnailUrl
                                    description
                                    orderNumber
                                }
                            }
                        }
                    }
                }    
            }
        }
    }
  `;

  return fetch(query, variables);

};

export const getCourseInstance = (userId) => {
  const variables = { id: userId };
  const query = graphql`
    query dataServiceCourseInstanceQuery($id: String!) {
        learner(id: $id){
            course{
                course{
                    id
                    name
                    levels{
                        edges{
                            node{
                                id
                                name
                                description
                            }
                        }
                    totalCount
                    }
                }
            }
        }
    }
  `;

  return fetch(query,variables);
};

export const getModulesForLevel = (userId, levelId) => {
// courseInstance is static for now
  const variables = { id: userId, levelId };

  const query = graphql`
    query dataServiceModuleInLevelQuery($levelId: String!, $id: String!) {
        learner(id: $id){
            course{
                course{
                    id
                    level(id: $levelId){
                        name
                        description
                        modules{
                            nodes{
                                id
                                name
                                thumbnailUrl
                                orderNumber
                                type
                            }
                        }
                    }
                }    
            }
        }
    }
  `;

  return fetch(query, variables);
};

export const getTasksInModule = (userId, moduleId, levelId) => {
// courseInstance is static for now
  const variables = { id: userId, moduleId, levelId };

  const query = graphql`
    query dataServiceTaskInModuleQuery($moduleId: String!, $levelId: String!, $id: String!) {
        learner(id: $id){
            course{
                course{
                    id
                    level(id: $levelId){
                        id
                        name
                        description
                        modules{
                            nodes{
                                id
                                name
                                thumbnailUrl
                                orderNumber
                            }
                        }
                    module(id: $moduleId){
                        id
                        name
                        description
                            tasks{
                                nodes{
                                    id
                                    description
                                    name
                                    asset{
                                        id
                                        questions
                                        timeLimit
                                        authType
                                        contentType
                                        url
                                        objectives{
                                            skill
                                            statement
                                        }
                                    }
                                }
                                totalCount
                            }
                        }
                    }
                }
            }
        }
    }
  `;

  return fetch(query, variables);
};

export const launchAssets = (variables) => {
  const query = graphql`    
      query dataServiceLaunchAssetQuery($assetId: String!, $appVersion: String!, $deviceId: String!){
          launchAssetHTML(appVersion: $appVersion, assetId: $assetId, deviceid: $deviceId)
      }
  `;

  return fetch(query, variables);
};
