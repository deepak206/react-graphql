/**
 * @flow
 * @relayHash c488a1c8e51e28d5c4e0a92b995c2f61
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type preferenceServiceTaskListUpdateQueryVariables = {|
  id: string
|};
export type preferenceServiceTaskListUpdateQueryResponse = {|
  +learner: {|
    +markTaskListWalkthroughComplete: ?boolean,
    +showTaskListWalkthrough: ?boolean,
  |}
|};
export type preferenceServiceTaskListUpdateQuery = {|
  variables: preferenceServiceTaskListUpdateQueryVariables,
  response: preferenceServiceTaskListUpdateQueryResponse,
|};
*/


/*
query preferenceServiceTaskListUpdateQuery(
  $id: String!
) {
  learner(id: $id) {
    markTaskListWalkthroughComplete
    showTaskListWalkthrough
  }
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
    "kind": "LinkedField",
    "alias": null,
    "name": "learner",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Learner",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "markTaskListWalkthroughComplete",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "showTaskListWalkthrough",
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
    "name": "preferenceServiceTaskListUpdateQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "preferenceServiceTaskListUpdateQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "preferenceServiceTaskListUpdateQuery",
    "id": null,
    "text": "query preferenceServiceTaskListUpdateQuery(\n  $id: String!\n) {\n  learner(id: $id) {\n    markTaskListWalkthroughComplete\n    showTaskListWalkthrough\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '94bd157b0c0f7b9060694af546201eb7';
module.exports = node;
