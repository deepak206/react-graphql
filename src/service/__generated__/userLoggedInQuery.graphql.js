/**
 * @flow
 * @relayHash 045c302e78d5ecd353b16d0739b7c02d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Role = "INSTITUTE_ADMIN" | "INSTRUCTOR" | "LEARNER" | "PEARSON_ADMIN" | "%future added value";
export type userLoggedInQueryVariables = {||};
export type userLoggedInQueryResponse = {|
  +getLogedInUser: ?{|
    +userId: ?string,
    +email: ?string,
    +primaryRole: ?Role,
    +firstName: ?string,
    +lastName: ?string,
  |}
|};
export type userLoggedInQuery = {|
  variables: userLoggedInQueryVariables,
  response: userLoggedInQueryResponse,
|};
*/


/*
query userLoggedInQuery {
  getLogedInUser(getAllRequired: true) {
    userId
    email
    primaryRole
    firstName
    lastName
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "getLogedInUser",
    "storageKey": "getLogedInUser(getAllRequired:true)",
    "args": [
      {
        "kind": "Literal",
        "name": "getAllRequired",
        "value": true
      }
    ],
    "concreteType": "JwtUser",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "userId",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "email",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "primaryRole",
        "args": null,
        "storageKey": null
      },
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "userLoggedInQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "userLoggedInQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "userLoggedInQuery",
    "id": null,
    "text": "query userLoggedInQuery {\n  getLogedInUser(getAllRequired: true) {\n    userId\n    email\n    primaryRole\n    firstName\n    lastName\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a4b1b7d902eb35029f2b3d420b67dd2e';
module.exports = node;
