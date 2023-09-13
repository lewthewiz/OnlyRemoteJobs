"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var models_1 = require("./models");
var loginRoute = express_1.Router();
/* GET home page. */
loginRoute.get('/:category', function (req, res, next) {
    var category_list_ = ['design', 'programming', 'customer-support', 'writing', 'devops-and-sysadmin', 'business', 'other'];
    var id = (category_list_.indexOf(req.params.category));
    var category_list = ['Design', 'Programming', 'Customer Support', 'Writing', 'Devops & Sysadmin', 'Business', 'Other'];
    var category = category_list[id];
    models_1.Job.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            createdAt: {
                $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30)
            },
            category: category
        }
    }).then(function (category_jobs) {
        var date = new Array();
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d;
        for (var i = 0; i < category_jobs.length; i++) {
            d = new Date(category_jobs[i].createdAt);
            category_jobs[i].date = month[d.getMonth()] + ' ' + d.getDate();
            category_jobs[i].page = 0;
            if (category_jobs[i].createdAt > (new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 3))) {
                category_jobs[i].new_post = 1;
            }
            if (category_jobs[i].key_skills) {
                category_jobs[i].key_skills = category_jobs[i].key_skills.split(",");
            }
            if (category_jobs[i].highlight_job == 1) {
                category_jobs[i].highlight_job = true;
            }
            else {
                category_jobs[i].highlight_job = false;
            }
        }
        models_1.Settings.findAll({
            where: { id: 1 }
        }).then(function (setting) {
            res.render('job-category-wise', { category: category, data: category_jobs, baseprice: setting[0].base_price, baseHref: "/", img_path: setting[0].img_path });
        });
    });
});
exports.default = loginRoute;
//# sourceMappingURL=view-category.js.map