/**
 * @flow
 * @relayHash f9a1ba0134e9cf2b6ca68965534efbed
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type preferenceServiceGetQueryVariables = {|
  id: string
|};
export type preferenceServiceGetQueryResponse = {|
  +learner: {|
    +showTaskListWalkthrough: ?boolean,
    +showDashboardWalkthrough: ?boolean,
    +locale: ?string,
  |}
|};
export type preferenceServiceGetQuery = {|
  variables: preferenceServiceGetQueryVariables,
  response: preferenceServiceGetQueryResponse,
|};
*/


/*
query preferenceServiceGetQuery(
  $id: String!
) {
  learner(id: $id) {
    showTaskListWalkthrough
    showDashboardWalkthrough
    locale
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
        "name": "showTaskListWalkthrough",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "showDashboardWalkthrough",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "locale",
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
    "name": "preferenceServiceGetQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "preferenceServiceGetQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "preferenceServiceGetQuery",
    "id": null,
    "text": "query preferenceServiceGetQuery(\n  $id: String!\n) {\n  learner(id: $id) {\n    showTaskListWalkthrough\n    showDashboardWalkthrough\n    locale\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '39bfcff847164968541646225fe5168f';
module.exports = node;
