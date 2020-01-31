/**
 * @flow
 * @relayHash 447d442da1ecbb5858fc23b45d39420f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type dataServiceLaunchAssetQueryVariables = {|
  assetId: string,
  appVersion: string,
  deviceId: string,
|};
export type dataServiceLaunchAssetQueryResponse = {|
  +launchAssetHTML: string
|};
export type dataServiceLaunchAssetQuery = {|
  variables: dataServiceLaunchAssetQueryVariables,
  response: dataServiceLaunchAssetQueryResponse,
|};
*/


/*
query dataServiceLaunchAssetQuery(
  $assetId: String!
  $appVersion: String!
  $deviceId: String!
) {
  launchAssetHTML(appVersion: $appVersion, assetId: $assetId, deviceid: $deviceId)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "assetId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "appVersion",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "deviceId",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "launchAssetHTML",
    "args": [
      {
        "kind": "Variable",
        "name": "appVersion",
        "variableName": "appVersion"
      },
      {
        "kind": "Variable",
        "name": "assetId",
        "variableName": "assetId"
      },
      {
        "kind": "Variable",
        "name": "deviceid",
        "variableName": "deviceId"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "dataServiceLaunchAssetQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "dataServiceLaunchAssetQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "dataServiceLaunchAssetQuery",
    "id": null,
    "text": "query dataServiceLaunchAssetQuery(\n  $assetId: String!\n  $appVersion: String!\n  $deviceId: String!\n) {\n  launchAssetHTML(appVersion: $appVersion, assetId: $assetId, deviceid: $deviceId)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4d2a6e9e8ffb9de889622ceaaabffd03';
module.exports = node;
