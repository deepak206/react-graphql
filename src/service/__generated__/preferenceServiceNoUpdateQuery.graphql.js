/**
 * @flow
 * @relayHash 419469e4569e0be1f4dc713d768bcfa5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type preferenceServiceNoUpdateQueryVariables = {|
  id: string
|};
export type preferenceServiceNoUpdateQueryResponse = {|
  +learner: {|
    +id: ?string
  |}
|};
export type preferenceServiceNoUpdateQuery = {|
  variables: preferenceServiceNoUpdateQueryVariables,
  response: preferenceServiceNoUpdateQueryResponse,
|};
*/


/*
query preferenceServiceNoUpdateQuery(
  $id: String!
) {
  learner(id: $id) {
    id
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
        "name": "id",
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
    "name": "preferenceServiceNoUpdateQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "preferenceServiceNoUpdateQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "preferenceServiceNoUpdateQuery",
    "id": null,
    "text": "query preferenceServiceNoUpdateQuery(\n  $id: String!\n) {\n  learner(id: $id) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a63c0837ce85ebb3185269f98db816d6';
module.exports = node;
