/**
 * @flow
 * @relayHash 8bf9a39ee911f5f5b6f4f6193ec4dc6b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type adminDashboardDataServiceQueryVariables = {|
  organizationId: string
|};
export type adminDashboardDataServiceQueryResponse = {|
  +activatedUsers: number
|};
export type adminDashboardDataServiceQuery = {|
  variables: adminDashboardDataServiceQueryVariables,
  response: adminDashboardDataServiceQueryResponse,
|};
*/


/*
query adminDashboardDataServiceQuery(
  $organizationId: String!
) {
  activatedUsers(organizationId: $organizationId)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "organizationId",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "activatedUsers",
    "args": [
      {
        "kind": "Variable",
        "name": "organizationId",
        "variableName": "organizationId"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "adminDashboardDataServiceQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "adminDashboardDataServiceQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "adminDashboardDataServiceQuery",
    "id": null,
    "text": "query adminDashboardDataServiceQuery(\n  $organizationId: String!\n) {\n  activatedUsers(organizationId: $organizationId)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cc393d298c2986efd9aeb2ae10d19d80';
module.exports = node;
