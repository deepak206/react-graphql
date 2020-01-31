/**
 * @flow
 * @relayHash 99029332cd9c379fa128237c0bac9b67
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type preferenceServiceDashboardUpdateQueryVariables = {|
  id: string
|};
export type preferenceServiceDashboardUpdateQueryResponse = {|
  +learner: {|
    +markDashboardWalkThroughComplete: ?boolean,
    +showDashboardWalkthrough: ?boolean,
  |}
|};
export type preferenceServiceDashboardUpdateQuery = {|
  variables: preferenceServiceDashboardUpdateQueryVariables,
  response: preferenceServiceDashboardUpdateQueryResponse,
|};
*/


/*
query preferenceServiceDashboardUpdateQuery(
  $id: String!
) {
  learner(id: $id) {
    markDashboardWalkThroughComplete
    showDashboardWalkthrough
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
        "name": "markDashboardWalkThroughComplete",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "showDashboardWalkthrough",
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
    "name": "preferenceServiceDashboardUpdateQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "preferenceServiceDashboardUpdateQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "preferenceServiceDashboardUpdateQuery",
    "id": null,
    "text": "query preferenceServiceDashboardUpdateQuery(\n  $id: String!\n) {\n  learner(id: $id) {\n    markDashboardWalkThroughComplete\n    showDashboardWalkthrough\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8afc48d4a768bfaa6e3bd5870ef32ae0';
module.exports = node;
