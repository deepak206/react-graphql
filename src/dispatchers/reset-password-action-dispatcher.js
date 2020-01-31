import { resetPasswordRequested } from '../actions/reset-password-action-type';
import { resetpasswordMutation } from '../service/mutations/reset-password-mutation';

export const ResetPasswordData =(email)=>(dispatch)=>{
  dispatch(resetPasswordRequested(email));
  resetpasswordMutation(email,(res)=>{
    console.log(res)
  })
}