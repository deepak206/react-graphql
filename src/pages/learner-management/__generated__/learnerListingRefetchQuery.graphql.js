/**
 * @flow
 * @relayHash c48c695a63fa1e8541acbffd25eb43da
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type learnerListing_getInstitute$ref = any;
export type learnerListingRefetchQueryVariables = {||};
export type learnerListingRefetchQueryResponse = {|
  +getInstitute: ?{|
    +$fragmentRefs: learnerListing_getInstitute$ref
  |}
|};
export type learnerListingRefetchQuery = {|
  variables: learnerListingRefetchQueryVariables,
  response: learnerListingRefetchQueryResponse,
|};
*/


/*
query learnerListingRefetchQuery {
  getInstitute {
    ...learnerListing_getInstitute
  }
}

fragment learnerListing_getInstitute on Institute {
  learners(first: 15, after: "0") {
    edges {
      node {
        id
        firstName
        email
        __typename
      }
      cursor
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": "0"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "learnerListingRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getInstitute",
        "storageKey": null,
        "args": null,
        "concreteType": "Institute",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "learnerListing_getInstitute",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "learnerListingRefetchQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getInstitute",
        "storageKey": null,
        "args": null,
        "concreteType": "Institute",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "learners",
            "storageKey": "learners(after:\"0\",first:15)",
            "args": (v0/*: any*/),
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
                        "name": "id",
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
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
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
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "learners",
            "args": (v0/*: any*/),
            "handle": "connection",
            "key": "learnerManagement_learners",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "learnerListingRefetchQuery",
    "id": null,
    "text": "query learnerListingRefetchQuery {\n  getInstitute {\n    ...learnerListing_getInstitute\n  }\n}\n\nfragment learnerListing_getInstitute on Institute {\n  learners(first: 15, after: \"0\") {\n    edges {\n      node {\n        id\n        firstName\n        email\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    totalCount\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8f1d72885ca24221fb5e12f56a3928ba';
module.exports = node;
