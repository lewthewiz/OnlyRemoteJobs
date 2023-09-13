"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var models_1 = require("./routes/models");
var job_list_1 = require("./routes/job-list");
var job_add_1 = require("./routes/job-add");
var job_details_1 = require("./routes/job-details");
var view_category_1 = require("./routes/view-category");
var api_1 = require("./routes/api");
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/', job_list_1.default);
app.use(cookieParser());
models_1.Settings.sync().
    then(function () {
    models_1.Settings.findAll({
        where: {
            id: 1
        }
    }).then(function (setting) {
        if (setting[0] == undefined) {
            models_1.Settings.create({
                base_price: 49
            });
        }
    });
});
models_1.Subscribe.sync();
models_1.Job.sync();
setInterval(function () {
    models_1.Job.destroy({
        where: {
            createdAt: {
                $lt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30)
            }
        }
    }).then(function () {
    });
}, 86400000);
app.use('/add*', job_add_1.default);
app.use('/job', job_details_1.default);
app.use('/api', api_1.default);
app.use('/category', view_category_1.default);
//handle 404
app.use(function (req, res, next) {
    console.error("Not found:" + req.originalUrl);
    res.status(404).send("Not found");
});
exports.default = app;
//# sourceMappingURL=app.js.map