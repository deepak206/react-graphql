/**
 * @flow
 * @relayHash a0887455d540772561c51206fe440b35
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type loginQueryVariables = {|
  token?: ?string
|};
export type loginQueryResponse = {|
  +loginUsingSSOToken: ?string
|};
export type loginQuery = {|
  variables: loginQueryVariables,
  response: loginQueryResponse,
|};
*/


/*
query loginQuery(
  $token: String
) {
  loginUsingSSOToken(pearsonExtSTGSSOSession: $token)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "token",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "loginUsingSSOToken",
    "args": [
      {
        "kind": "Variable",
        "name": "pearsonExtSTGSSOSession",
        "variableName": "token"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "loginQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "loginQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "loginQuery",
    "id": null,
    "text": "query loginQuery(\n  $token: String\n) {\n  loginUsingSSOToken(pearsonExtSTGSSOSession: $token)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f82f7b81e2eda99e00d612df7c59b735';
module.exports = node;
