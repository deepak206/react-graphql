/**
 * @flow
 * @relayHash 72bf31c04c92ca105dd4428af2a9292f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ModuleType = "LEVEL_TEST" | "MODULE" | "QUIZ" | "REMEDIATION" | "REVIEW_TEST" | "%future added value";
export type dataServiceModuleInLevelQueryVariables = {|
  levelId: string,
  id: string,
|};
export type dataServiceModuleInLevelQueryResponse = {|
  +learner: {|
    +course: ?{|
      +course: ?{|
        +id: ?string,
        +level: ?{|
          +name: ?string,
          +description: ?string,
          +modules: ?{|
            +nodes: ?$ReadOnlyArray<?{|
              +id: ?string,
              +name: ?string,
              +thumbnailUrl: ?string,
              +orderNumber: ?number,
              +type: ?ModuleType,
            |}>
          |},
        |},
      |}
    |}
  |}
|};
export type dataServiceModuleInLevelQuery = {|
  variables: dataServiceModuleInLevelQueryVariables,
  response: dataServiceModuleInLevelQueryResponse,
|};
*/


/*
query dataServiceModuleInLevelQuery(
  $levelId: String!
  $id: String!
) {
  learner(id: $id) {
    course {
      course {
        id
        level(id: $levelId) {
          name
          description
          modules {
            nodes {
              id
              name
              thumbnailUrl
              orderNumber
              type
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
                  (v2/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "description",
                    "args": null,
                    "storageKey": null
                  },
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
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "type",
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
    "name": "dataServiceModuleInLevelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "dataServiceModuleInLevelQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "dataServiceModuleInLevelQuery",
    "id": null,
    "text": "query dataServiceModuleInLevelQuery(\n  $levelId: String!\n  $id: String!\n) {\n  learner(id: $id) {\n    course {\n      course {\n        id\n        level(id: $levelId) {\n          name\n          description\n          modules {\n            nodes {\n              id\n              name\n              thumbnailUrl\n              orderNumber\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '829b38c02d2ef998ed587e7815badacf';
module.exports = node;
