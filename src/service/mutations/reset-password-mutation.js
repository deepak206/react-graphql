import {
  commitMutation,
} from 'react-relay'
import graphql from "babel-plugin-relay/macro";
import environment from "../../relay/environment";
import { getErrorValidationMessage } from '../../utils';

const mutation= graphql`
  mutation resetPasswordMutation($ResetPasswordInput: String!){
    resetPassword:resetPassword(email:$ResetPasswordInput)
  }
  `

export const resetpasswordMutation = (email,callback)=>{
  const variables={
    email
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
        console.log(err)
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