/**
 * @flow
 * @relayHash 49167963fc4f3d3a3bbdcebc4932b4ce
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type dataServiceCourseModuleQueryVariables = {|
  id: string
|};
export type dataServiceCourseModuleQueryResponse = {|
  +learner: {|
    +course: ?{|
      +course: ?{|
        +id: ?string,
        +name: ?string,
        +levels: ?{|
          +nodes: ?$ReadOnlyArray<?{|
            +id: ?string,
            +name: ?string,
            +description: ?string,
            +modules: ?{|
              +nodes: ?$ReadOnlyArray<?{|
                +id: ?string,
                +name: ?string,
                +thumbnailUrl: ?string,
                +description: ?string,
                +orderNumber: ?number,
              |}>
            |},
          |}>
        |},
      |}
    |}
  |}
|};
export type dataServiceCourseModuleQuery = {|
  variables: dataServiceCourseModuleQueryVariables,
  response: dataServiceCourseModuleQueryResponse,
|};
*/


/*
query dataServiceCourseModuleQuery(
  $id: String!
) {
  learner(id: $id) {
    course {
      course {
        id
        name
        levels {
          nodes {
            id
            name
            description
            modules {
              nodes {
                id
                name
                thumbnailUrl
                description
                orderNumber
              }
            }
          }
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
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v4 = [
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
                    "name": "nodes",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Level",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "modules",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ModuleConnection",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "nodes",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Module",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "thumbnailUrl",
                                "args": null,
                                "storageKey": null
                              },
                              (v3/*: any*/),
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "orderNumber",
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
    "name": "dataServiceCourseModuleQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "dataServiceCourseModuleQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "dataServiceCourseModuleQuery",
    "id": null,
    "text": "query dataServiceCourseModuleQuery(\n  $id: String!\n) {\n  learner(id: $id) {\n    course {\n      course {\n        id\n        name\n        levels {\n          nodes {\n            id\n            name\n            description\n            modules {\n              nodes {\n                id\n                name\n                thumbnailUrl\n                description\n                orderNumber\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c85bb75f8fe921b897a9112e73e1415f';
module.exports = node;
