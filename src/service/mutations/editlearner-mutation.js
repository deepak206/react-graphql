import {
  commitMutation,
} from 'react-relay'
import graphql from "babel-plugin-relay/macro";
import environment from "../../relay/environment";
import { getErrorValidationMessage } from '../../utils';

const mutation= graphql`
  mutation editlearnerMutation($EditLearnerInput: EditLearnerInput){
    learner:editLearner(editLearnerInput:$EditLearnerInput)	{
    firstName
  }
  }
  `

export const editLearnerMutation = (id,firstName,lastName,accessType,callback)=>{
  const variables={
    EditLearnerInput: {
      id,
      firstName,
      lastName,
      accessType
    }
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response)=>{
        callback(response)
      },
      onError: (err)=>{
        let errMessage;

        try {
          errMessage = JSON.parse(err);
          callback(getErrorValidationMessage(errMessage));
        }
        catch{
          callback({ error: "Something went wrong" });
        }
      },
    }
  )
}