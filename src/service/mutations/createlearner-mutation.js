import {
  commitMutation,
} from 'react-relay'
import graphql from "babel-plugin-relay/macro";
import environment from "../../relay/environment";
import { getErrorValidationMessage } from '../../utils';

const mutation= graphql`
mutation createlearnerMutation($CreateLearnerInput: CreateLearnerInputInput!){
  learner:createLearner(createLearnerInput:$CreateLearnerInput){
    firstName
    lastName 
    userId
  }
}
`

export const createLearnerMutation = (firstName,licenseKey,email,lastName,password,accessType,instituteId, productId,callback)=>{
  const variables={
    CreateLearnerInput: {
      firstName,
      lastName,
      licenseKey,
      email,
      accessType,
      instituteId,
      password,
      productId
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