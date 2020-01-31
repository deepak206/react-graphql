/**
 * @flow
 * @relayHash 91d2b2b3ad6c979adeaa161bb13294d0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LearnerAccessType = "MASTER" | "SUBSCRIBED" | "TRIAL" | "%future added value";
export type CreateLearnerInputInput = {|
  instructorId?: ?string,
  firstName: string,
  sectionId?: ?string,
  lastName: string,
  accessType: LearnerAccessType,
  productId: string,
  email: string,
  departmentId?: ?string,
  licenseKey: string,
  instituteId: string,
  password: string,
  courseId: string,
|};
export type createlearnerMutationVariables = {|
  CreateLearnerInput: CreateLearnerInputInput
|};
export type createlearnerMutationResponse = {|
  +learner: {|
    +firstName: ?string,
    +lastName: ?string,
    +userId: ?string,
  |}
|};
export type createlearnerMutation = {|
  variables: createlearnerMutationVariables,
  response: createlearnerMutationResponse,
|};
*/


/*
mutation createlearnerMutation(
  $CreateLearnerInput: CreateLearnerInputInput!
) {
  learner: createLearner(createLearnerInput: $CreateLearnerInput) {
    firstName
    lastName
    userId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "CreateLearnerInput",
    "type": "CreateLearnerInputInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "learner",
    "name": "createLearner",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "createLearnerInput",
        "variableName": "CreateLearnerInput"
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "lastName",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "userId",
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
    "name": "createlearnerMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "createlearnerMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "createlearnerMutation",
    "id": null,
    "text": "mutation createlearnerMutation(\n  $CreateLearnerInput: CreateLearnerInputInput!\n) {\n  learner: createLearner(createLearnerInput: $CreateLearnerInput) {\n    firstName\n    lastName\n    userId\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bf95a88833d1b764f169cf1eb00d2255';
module.exports = node;
