import { commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import environment from "../../relay/environment";

const mutation = graphql`
    mutation deleteLearnerMutation($id: String!) {
      deleteLearner(id: $id)
    }
`;

export const DeleteLearnerMutation = (
  id,
  callback
) => {
  const variables = {
    id
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response) => {
      callback(response);
    },
    onError: (err) => {
      let errMessage;

      try{
        errMessage = JSON.parse(err);
        callback({ error: errMessage.message });
      }
      catch{
        callback({ error: "Something went wrong" });
      }
    },
  });
}
