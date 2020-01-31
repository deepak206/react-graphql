/**
 * @flow
 * @relayHash d2991ac5d23dbd09ebd391c0b0943790
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LearnerAccessType = "MASTER" | "SUBSCRIBED" | "TRIAL" | "%future added value";
export type getLearnerDataQueryVariables = {|
  id: string
|};
export type getLearnerDataQueryResponse = {|
  +learner: {|
    +userId: ?string,
    +email: ?string,
    +course: ?{|
      +accessType: ?LearnerAccessType
    |},
    +firstName: ?string,
    +lastName: ?string,
  |}
|};
export type getLearnerDataQuery = {|
  variables: getLearnerDataQueryVariables,
  response: getLearnerDataQueryResponse,
|};
*/


/*
query getLearnerDataQuery(
  $id: String!
) {
  learner(id: $id) {
    userId
    email
    course {
      accessType
    }
    firstName
    lastName
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
        "kind": "ScalarField",
        "alias": null,
        "name": "userId",
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
        "kind": "LinkedField",
        "alias": null,
        "name": "course",
        "storageKey": null,
        "args": null,
        "concreteType": "UserCourseConnection",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "accessType",
            "args": null,
            "storageKey": null
          }
        ]
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
        "name": "lastName",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "getLearnerDataQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "getLearnerDataQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "getLearnerDataQuery",
    "id": null,
    "text": "query getLearnerDataQuery(\n  $id: String!\n) {\n  learner(id: $id) {\n    userId\n    email\n    course {\n      accessType\n    }\n    firstName\n    lastName\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e4679a01ec0bcd5ad2369b62b0770589';
module.exports = node;
