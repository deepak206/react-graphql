/**
 * @flow
 * @relayHash 3b14a6cea88ee9595663d9f99f691c65
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type institutesEditByIdQueryVariables = {|
  id: string
|};
export type institutesEditByIdQueryResponse = {|
  +getInstitute: ?{|
    +id: ?string,
    +name: ?string,
    +address: ?{|
      +city: ?string,
      +addressString: ?string,
      +country: ?string,
    |},
  |}
|};
export type institutesEditByIdQuery = {|
  variables: institutesEditByIdQueryVariables,
  response: institutesEditByIdQueryResponse,
|};
*/


/*
query institutesEditByIdQuery(
  $id: String!
) {
  getInstitute(instituteId: $id) {
    id
    name
    address {
      city
      addressString
      country
    }
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
    "name": "getInstitute",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "instituteId",
        "variableName": "id"
      }
    ],
    "concreteType": "Institute",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "address",
        "storageKey": null,
        "args": null,
        "concreteType": "Address",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "city",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "addressString",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "country",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "institutesEditByIdQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "institutesEditByIdQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "institutesEditByIdQuery",
    "id": null,
    "text": "query institutesEditByIdQuery(\n  $id: String!\n) {\n  getInstitute(instituteId: $id) {\n    id\n    name\n    address {\n      city\n      addressString\n      country\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '718b45f886fc7f5493f308f6686543d5';
module.exports = node;
