/**
 * @flow
 * @relayHash cb2b29abc4c31fe624cecc8d9a51028d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type dataServiceTaskInModuleQueryVariables = {|
  moduleId: string,
  levelId: string,
  id: string,
|};
export type dataServiceTaskInModuleQueryResponse = {|
  +learner: {|
    +course: ?{|
      +course: ?{|
        +id: ?string,
        +level: ?{|
          +id: ?string,
          +name: ?string,
          +description: ?string,
          +modules: ?{|
            +nodes: ?$ReadOnlyArray<?{|
              +id: ?string,
              +name: ?string,
              +thumbnailUrl: ?string,
              +orderNumber: ?number,
            |}>
          |},
          +module: ?{|
            +id: ?string,
            +name: ?string,
            +description: ?string,
            +tasks: ?{|
              +nodes: ?$ReadOnlyArray<?{|
                +id: ?string,
                +description: ?string,
                +name: ?string,
                +asset: ?{|
                  +id: ?string,
                  +questions: number,
                  +timeLimit: ?number,
                  +authType: string,
                  +contentType: ?string,
                  +url: string,
                  +objectives: ?$ReadOnlyArray<?{|
                    +skill: string,
                    +statement: ?string,
                  |}>,
                |},
              |}>,
              +totalCount: any,
            |},
          |},
        |},
      |}
    |}
  |}
|};
export type dataServiceTaskInModuleQuery = {|
  variables: dataServiceTaskInModuleQueryVariables,
  response: dataServiceTaskInModuleQueryResponse,
|};
*/


/*
query dataServiceTaskInModuleQuery(
  $moduleId: String!
  $levelId: String!
  $id: String!
) {
  learner(id: $id) {
    course {
      course {
        id
        level(id: $levelId) {
          id
          name
          description
          modules {
            nodes {
              id
              name
              thumbnailUrl
              orderNumber
            }
          }
          module(id: $moduleId) {
            id
            name
            description
            tasks {
              nodes {
                id
                description
                name
                asset {
                  id
                  questions
                  timeLimit
                  authType
                  contentType
                  url
                  objectives {
                    skill
                    statement
                  }
                }
              }
              totalCount
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
    "name": "moduleId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "levelId",
    "type": "String!",
    "defaultValue": null
  },
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "level",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "levelId"
                  }
                ],
                "concreteType": "Level",
                "plural": false,
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
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "module",
                    "storageKey": null,
                    "args": [
                      {
                        "kind": "Variable",
                        "name": "id",
                        "variableName": "moduleId"
                      }
                    ],
                    "concreteType": "Module",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "tasks",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "TaskConnection",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "nodes",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Task",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              (v3/*: any*/),
                              (v2/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "asset",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Asset",
                                "plural": false,
                                "selections": [
                                  (v1/*: any*/),
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "questions",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "timeLimit",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "authType",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "contentType",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "url",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "objectives",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "AssetObjectives",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "skill",
                                        "args": null,
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "statement",
                                        "args": null,
                                        "storageKey": null
                                      }
                                    ]
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
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "dataServiceTaskInModuleQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "dataServiceTaskInModuleQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "dataServiceTaskInModuleQuery",
    "id": null,
    "text": "query dataServiceTaskInModuleQuery(\n  $moduleId: String!\n  $levelId: String!\n  $id: String!\n) {\n  learner(id: $id) {\n    course {\n      course {\n        id\n        level(id: $levelId) {\n          id\n          name\n          description\n          modules {\n            nodes {\n              id\n              name\n              thumbnailUrl\n              orderNumber\n            }\n          }\n          module(id: $moduleId) {\n            id\n            name\n            description\n            tasks {\n              nodes {\n                id\n                description\n                name\n                asset {\n                  id\n                  questions\n                  timeLimit\n                  authType\n                  contentType\n                  url\n                  objectives {\n                    skill\n                    statement\n                  }\n                }\n              }\n              totalCount\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6802472ee4951e3fdad64daf104dbad8';
module.exports = node;
