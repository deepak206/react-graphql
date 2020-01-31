/**
 * @flow
 * @relayHash 5cc5139de15ddd678f5b4c4d42b69dcc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type learnerManagementQueryVariables = {|
  pageId?: ?string,
  redordPerPage?: ?number,
  instituteId?: ?string,
|};
export type learnerManagementQueryResponse = {|
  +getInstitute: ?{|
    +name: ?string,
    +learners: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +userId: ?string,
          +firstName: ?string,
          +email: ?string,
        |}
      |}>,
      +pageInfo: {|
        +hasNextPage: boolean,
        +hasPreviousPage: boolean,
        +startCursor: ?string,
        +endCursor: ?string,
      |},
      +totalCount: any,
    |},
  |}
|};
export type learnerManagementQuery = {|
  variables: learnerManagementQueryVariables,
  response: learnerManagementQueryResponse,
|};
*/


/*
query learnerManagementQuery(
  $pageId: String
  $redordPerPage: Int
  $instituteId: String
) {
  getInstitute(instituteId: $instituteId) {
    name
    learners(first: $redordPerPage, after: $pageId, sort: {order: DESC, field: "createdOn"}) {
      edges {
        node {
          userId
          firstName
          email
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pageId",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "redordPerPage",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "instituteId",
    "type": "String",
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
        "variableName": "instituteId"
      }
    ],
    "concreteType": "Institute",
    "plural": false,
    "selections": [
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
        "name": "learners",
        "storageKey": null,
        "args": [
          {
            "kind": "Variable",
            "name": "after",
            "variableName": "pageId"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "redordPerPage"
          },
          {
            "kind": "Literal",
            "name": "sort",
            "value": {
              "field": "createdOn",
              "order": "DESC"
            }
          }
        ],
        "concreteType": "LearnerConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "LearnerEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Learner",
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
                    "name": "firstName",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "email",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pageInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "PageInfo",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasNextPage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasPreviousPage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "startCursor",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "endCursor",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalCount",
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
    "name": "learnerManagementQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "learnerManagementQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "learnerManagementQuery",
    "id": null,
    "text": "query learnerManagementQuery(\n  $pageId: String\n  $redordPerPage: Int\n  $instituteId: String\n) {\n  getInstitute(instituteId: $instituteId) {\n    name\n    learners(first: $redordPerPage, after: $pageId, sort: {order: DESC, field: \"createdOn\"}) {\n      edges {\n        node {\n          userId\n          firstName\n          email\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c63f8ed2ac5d5568ff72bc0da5a37aa';
module.exports = node;
