/**
 * @flow
 * @relayHash 677489fde9f116987d34b6bc8deb79a1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateInstituteInputInput = {|
  name: string,
  city: string,
  town?: ?string,
  addressString: string,
  country: string,
|};
export type institutesAddMutationVariables = {|
  Input?: ?CreateInstituteInputInput
|};
export type institutesAddMutationResponse = {|
  +createInstitute: ?{|
    +instituteId: ?string,
    +name: ?string,
  |}
|};
export type institutesAddMutation = {|
  variables: institutesAddMutationVariables,
  response: institutesAddMutationResponse,
|};
*/


/*
mutation institutesAddMutation(
  $Input: CreateInstituteInputInput
) {
  createInstitute(createInstituteInput: $Input) {
    instituteId
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "Input",
    "type": "CreateInstituteInputInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createInstitute",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "createInstituteInput",
        "variableName": "Input"
      }
    ],
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "institutesAddMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "institutesAddMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "institutesAddMutation",
    "id": null,
    "text": "mutation institutesAddMutation(\n  $Input: CreateInstituteInputInput\n) {\n  createInstitute(createInstituteInput: $Input) {\n    instituteId\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fd719476bd94093ff3cb15b1a546f74f';
module.exports = node;
