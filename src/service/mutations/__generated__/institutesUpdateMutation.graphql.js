/**
 * @flow
 * @relayHash 0657158ef1604f518fc0e1b0a22a580a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateInstituteInputInput = {|
  addressString: string,
  town?: ?string,
  name: string,
  city: string,
  country: string,
|};
export type institutesUpdateMutationVariables = {|
  Input?: ?UpdateInstituteInputInput,
  InstituteId?: ?string,
|};
export type institutesUpdateMutationResponse = {|
  +updateInstitute: ?{|
    +id: ?string,
    +instituteId: ?string,
  |}
|};
export type institutesUpdateMutation = {|
  variables: institutesUpdateMutationVariables,
  response: institutesUpdateMutationResponse,
|};
*/


/*
mutation institutesUpdateMutation(
  $Input: UpdateInstituteInputInput
  $InstituteId: String
) {
  updateInstitute(updateInstituteInput: $Input, instituteId: $InstituteId) {
    id
    instituteId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "Input",
    "type": "UpdateInstituteInputInput",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "InstituteId",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateInstitute",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "instituteId",
        "variableName": "InstituteId"
      },
      {
        "kind": "Variable",
        "name": "updateInstituteInput",
        "variableName": "Input"
      }
    ],
    "concreteType": "Institute",
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
        "name": "instituteId",
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
    "name": "institutesUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "institutesUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "institutesUpdateMutation",
    "id": null,
    "text": "mutation institutesUpdateMutation(\n  $Input: UpdateInstituteInputInput\n  $InstituteId: String\n) {\n  updateInstitute(updateInstituteInput: $Input, instituteId: $InstituteId) {\n    id\n    instituteId\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bb048067ceb27a6615274fc07ab57fe2';
module.exports = node;
