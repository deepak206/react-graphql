/**
 * @flow
 * @relayHash 03160ccebc88def91350ce01a8b0b92a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type institutesProductCourseIdQueryVariables = {|
  id: string
|};
export type institutesProductCourseIdQueryResponse = {|
  +product: ?{|
    +id: ?string,
    +name: ?string,
    +course: ?{|
      +name: ?string,
      +id: ?string,
    |},
  |}
|};
export type institutesProductCourseIdQuery = {|
  variables: institutesProductCourseIdQueryVariables,
  response: institutesProductCourseIdQueryResponse,
|};
*/


/*
query institutesProductCourseIdQuery(
  $id: String!
) {
  product(productIdentifier: $id) {
    id
    name
    course {
      name
      id
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "product",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "productIdentifier",
        "variableName": "id"
      }
    ],
    "concreteType": "Product",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "course",
        "storageKey": null,
        "args": null,
        "concreteType": "Course",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "institutesProductCourseIdQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "institutesProductCourseIdQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "institutesProductCourseIdQuery",
    "id": null,
    "text": "query institutesProductCourseIdQuery(\n  $id: String!\n) {\n  product(productIdentifier: $id) {\n    id\n    name\n    course {\n      name\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7bec1d9dd4f6e51b573753372c816067';
module.exports = node;
