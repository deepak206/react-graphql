/**
 * @flow
 * @relayHash 1f3aca1949546330f8daebd0610c0acc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type institutesCitiesQueryVariables = {||};
export type institutesCitiesQueryResponse = {|
  +cities: ?{|
    +nodes: ?$ReadOnlyArray<?{|
      +name: ?string,
      +id: ?string,
    |}>
  |}
|};
export type institutesCitiesQuery = {|
  variables: institutesCitiesQueryVariables,
  response: institutesCitiesQueryResponse,
|};
*/


/*
query institutesCitiesQuery {
  cities(first: 2000) {
    nodes {
      name
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "cities",
    "storageKey": "cities(first:2000)",
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 2000
      }
    ],
    "concreteType": "CityConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "nodes",
        "storageKey": null,
        "args": null,
        "concreteType": "City",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
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
    "name": "institutesCitiesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "institutesCitiesQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "institutesCitiesQuery",
    "id": null,
    "text": "query institutesCitiesQuery {\n  cities(first: 2000) {\n    nodes {\n      name\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c406eb6a14c81cca6369b07f2eaa8279';
module.exports = node;
