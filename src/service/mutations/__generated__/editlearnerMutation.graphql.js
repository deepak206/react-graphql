/**
 * @flow
 * @relayHash dbdf1033e1c591fa3e01793047cccd8b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LearnerAccessType = "MASTER" | "SUBSCRIBED" | "TRIAL" | "%future added value";
export type EditLearnerInput = {|
  firstName?: ?string,
  _id?: ?string,
  id: string,
  lastName?: ?string,
  accessType?: ?LearnerAccessType,
|};
export type editlearnerMutationVariables = {|
  EditLearnerInput?: ?EditLearnerInput
|};
export type editlearnerMutationResponse = {|
  +learner: ?{|
    +firstName: ?string
  |}
|};
export type editlearnerMutation = {|
  variables: editlearnerMutationVariables,
  response: editlearnerMutationResponse,
|};
*/


/*
mutation editlearnerMutation(
  $EditLearnerInput: EditLearnerInput
) {
  learner: editLearner(editLearnerInput: $EditLearnerInput) {
    firstName
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "EditLearnerInput",
    "type": "EditLearnerInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "learner",
    "name": "editLearner",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "editLearnerInput",
        "variableName": "EditLearnerInput"
      }
    ],
    "concreteType": "Learner",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "firstName",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "editlearnerMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "editlearnerMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "editlearnerMutation",
    "id": null,
    "text": "mutation editlearnerMutation(\n  $EditLearnerInput: EditLearnerInput\n) {\n  learner: editLearner(editLearnerInput: $EditLearnerInput) {\n    firstName\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f5ba65b4f47eab60727f92f08e45d6d6';
module.exports = node;
