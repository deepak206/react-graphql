/**
 * @flow
 * @relayHash 81fee333d02d23c329c0131779364764
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type deleteLearnerMutationVariables = {|
  id: string
|};
export type deleteLearnerMutationResponse = {|
  +deleteLearner: boolean
|};
export type deleteLearnerMutation = {|
  variables: deleteLearnerMutationVariables,
  response: deleteLearnerMutationResponse,
|};
*/


/*
mutation deleteLearnerMutation(
  $id: String!
) {
  deleteLearner(id: $id)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "deleteLearner",
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "deleteLearnerMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "deleteLearnerMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "deleteLearnerMutation",
    "id": null,
    "text": "mutation deleteLearnerMutation(\n  $id: String!\n) {\n  deleteLearner(id: $id)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fcba32cddc866549adb2fc908ec85293';
module.exports = node;
