/**
 * @flow
 * @relayHash 649d15f36431bdc271317abb513bba1e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type dataServiceCourseInstanceQueryVariables = {|
  id: string
|};
export type dataServiceCourseInstanceQueryResponse = {|
  +learner: {|
    +course: ?{|
      +course: ?{|
        +id: ?string,
        +name: ?string,
        +levels: ?{|
          +edges: ?$ReadOnlyArray<?{|
            +node: ?{|
              +id: ?string,
              +name: ?string,
              +description: ?string,
            |}
          |}>,
          +totalCount: any,
        |},
      |}
    |}
  |}
|};
export type dataServiceCourseInstanceQuery = {|
  variables: dataServiceCourseInstanceQueryVariables,
  response: dataServiceCourseInstanceQueryResponse,
|};
*/


/*
query dataServiceCourseInstanceQuery(
  $id: String!
) {
  learner(id: $id) {
    course {
      course {
        id
        name
        levels {
          edges {
            node {
              id
              name
              description
            }
          }
          totalCount
        }
      }
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
        "kind": "LinkedField",
        "alias": null,
        "name": "course",
        "storageKey": null,
        "args": null,
        "concreteType": "UserCourseConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "course",
            "storageKey": null,
            "args": null,
            "concreteType": "Course",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "levels",
                "storageKey": null,
                "args": null,
                "concreteType": "LevelConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LevelEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Level",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "description",
                            "args": null,
                            "storageKey": null
                          }
                        ]
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
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "dataServiceCourseInstanceQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "dataServiceCourseInstanceQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "dataServiceCourseInstanceQuery",
    "id": null,
    "text": "query dataServiceCourseInstanceQuery(\n  $id: String!\n) {\n  learner(id: $id) {\n    course {\n      course {\n        id\n        name\n        levels {\n          edges {\n            node {\n              id\n              name\n              description\n            }\n          }\n          totalCount\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3db8ec4c1c79bbec35f3a6e18d24ae32';
module.exports = node;
