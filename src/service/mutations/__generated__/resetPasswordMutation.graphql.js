/**
 * @flow
 * @relayHash 7ba3d7684e1cde9fcbdc2a571e59d3df
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type resetPasswordMutationVariables = {|
  ResetPasswordInput: string
|};
export type resetPasswordMutationResponse = {|
  +resetPassword: boolean
|};
export type resetPasswordMutation = {|
  variables: resetPasswordMutationVariables,
  response: resetPasswordMutationResponse,
|};
*/


/*
mutation resetPasswordMutation(
  $ResetPasswordInput: String!
) {
  resetPassword: resetPassword(email: $ResetPasswordInput)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "ResetPasswordInput",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": "resetPassword",
    "name": "resetPassword",
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "ResetPasswordInput"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "resetPasswordMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "resetPasswordMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "resetPasswordMutation",
    "id": null,
    "text": "mutation resetPasswordMutation(\n  $ResetPasswordInput: String!\n) {\n  resetPassword: resetPassword(email: $ResetPasswordInput)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '58ed4f58926d2d47582929bfc36d4eb8';
module.exports = node;
