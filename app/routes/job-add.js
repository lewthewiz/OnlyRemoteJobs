"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var braintree_gateway_1 = require("./braintree-gateway");
var models_1 = require("./models");
var jobAddRoute = express_1.Router();
/* GET home page. */
jobAddRoute.get('/', function (req, res, next) {
    var token;
    models_1.Settings.findAll({
        where: { id: 1 },
    }).then(function (setting) {
        braintree_gateway_1.gateway.clientToken.generate({}, function (err, response) {
            var settings = JSON.stringify(setting);
            res.render('job-add', { data: {}, token: response.clientToken, baseHref: "/add/", price: settings, baseprice: setting[0].base_price, img_path: setting[0].img_path });
        });
    });
});
exports.default = jobAddRoute;
//# sourceMappingURL=job-add.js.map