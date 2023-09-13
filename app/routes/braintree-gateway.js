"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var braintree = require("braintree");
var BRAINTREE_ENVIRONMENT = process.env.BRAINTREE_ENVIRONMENT === 'Production' ? braintree.Environment.Production : braintree.Environment.Sandbox;
var BRAINTREE_MERCHANTID = process.env.BRAINTREE_MERCHANTID || "d87r398t3hmtwbk2";
var BRAINTREE_PUBLICKEY = process.env.PUBLICKEY || "zngkcnxfg9gp8b5q";
var BRAINTREE_PRIVATEKEY = process.env.PRIVATEKEY || "099027bd570476a6114f587d2200b642";
exports.gateway = braintree.connect({
    environment: BRAINTREE_ENVIRONMENT,
    merchantId: BRAINTREE_MERCHANTID,
    publicKey: BRAINTREE_PUBLICKEY,
    privateKey: BRAINTREE_PRIVATEKEY
});
//# sourceMappingURL=braintree-gateway.js.map