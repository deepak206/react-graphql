/**
 * @flow
 * @relayHash 1807366fb7937ad2dcdc5ec1636c8345
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type logoutQueryVariables = {||};
export type logoutQueryResponse = {|
  +logOut: ?string
|};
export type logoutQuery = {|
  variables: logoutQueryVariables,
  response: logoutQueryResponse,
|};
*/


/*
query logoutQuery {
  logOut
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "logOut",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "logoutQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "logoutQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "logoutQuery",
    "id": null,
    "text": "query logoutQuery {\n  logOut\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4a0c68cc9e7c515938ad077a73a8cc54';
module.exports = node;
