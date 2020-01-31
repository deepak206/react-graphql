/**
 * @flow
 * @relayHash ef8f87e0541518acb7c1f14763d47fc9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type institutesAssignMutationVariables = {|
  productIds: $ReadOnlyArray<?string>,
  instituteId: string,
|};
export type institutesAssignMutationResponse = {|
  +assignProductToInstitute: boolean
|};
export type institutesAssignMutation = {|
  variables: institutesAssignMutationVariables,
  response: institutesAssignMutationResponse,
|};
*/


/*
mutation institutesAssignMutation(
  $productIds: [String]!
  $instituteId: String!
) {
  assignProductToInstitute(productIds: $productIds, instituteId: $instituteId)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "productIds",
    "type": "[String]!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "instituteId",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "assignProductToInstitute",
    "args": [
      {
        "kind": "Variable",
        "name": "instituteId",
        "variableName": "instituteId"
      },
      {
        "kind": "Variable",
        "name": "productIds",
        "variableName": "productIds"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "institutesAssignMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "institutesAssignMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "institutesAssignMutation",
    "id": null,
    "text": "mutation institutesAssignMutation(\n  $productIds: [String]!\n  $instituteId: String!\n) {\n  assignProductToInstitute(productIds: $productIds, instituteId: $instituteId)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fcfc84d9871c4110d8fa97ce3f2e82a7';
module.exports = node;
