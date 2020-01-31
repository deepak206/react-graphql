/**
 * @flow
 * @relayHash 439541a25f1c3004967f13648ef08003
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type adminDashboardQueryVariables = {||};
export type adminDashboardQueryResponse = {|
  +institutes: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +instituteId: ?string,
        +name: ?string,
      |}
    |}>
  |}
|};
export type adminDashboardQuery = {|
  variables: adminDashboardQueryVariables,
  response: adminDashboardQueryResponse,
|};
*/


/*
query adminDashboardQuery {
  institutes(first: 1000, after: "0") {
    edges {
      node {
        instituteId
        name
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "institutes",
    "storageKey": "institutes(after:\"0\",first:1000)",
    "args": [
      {
        "kind": "Literal",
        "name": "after",
        "value": "0"
      },
      {
        "kind": "Literal",
        "name": "first",
        "value": 1000
      }
    ],
    "concreteType": "InstituteConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "edges",
        "storageKey": null,
        "args": null,
        "concreteType": "InstituteEdge",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
            "concreteType": "Institute",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "instituteId",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              }
            ]
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
    "name": "adminDashboardQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "adminDashboardQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "adminDashboardQuery",
    "id": null,
    "text": "query adminDashboardQuery {\n  institutes(first: 1000, after: \"0\") {\n    edges {\n      node {\n        instituteId\n        name\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6b3fe74da06ef8b377fcfaea11ab427b';
module.exports = node;
