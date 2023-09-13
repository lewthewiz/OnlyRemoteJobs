"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var models_1 = require("./models");
var anchorme_1 = require("anchorme");
var jobDetailsRoute = express_1.Router();
/* GET home page. */
jobDetailsRoute.get('/:id/*', function (req, res, next) {
    models_1.Job.findAll({
        where: { id: req.params.id }
    }).then(function (job) {
        var baseprice;
        models_1.Settings.findAll({
            where: { id: 1 }
        }).then(function (setting) {
            var d = new Date(job[0].createdAt);
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            job[0].date = month[d.getMonth()] + ' ' + d.getDate();
            if (job[0].benifit != null) {
                job[0].benifit = job[0].benifit.split("\n").join(",");
                job[0].benifit = job[0].benifit.split(",");
            }
            if (job[0].skill_des != null) {
                job[0].skill_des = job[0].skill_des.split('\n').join(",");
                job[0].skill_des = job[0].skill_des.split(',');
            }
            if (job[0].key_skills != null)
                job[0].key_skills = job[0].key_skills.split(",");
            if (job[0].visa_psponcer == '1')
                job[0].visa_psponcer = true;
            else
                job[0].visa_psponcer = false;
            if (job[0].benifit == undefined || job[0].benifit == '' || job[0].benifit == ' ' || job[0].benifit == null)
                job[0].benifit = false;
            if (job[0].job_des == '' || job[0].job_des == ' ' || job[0].job_des == null)
                job[0].job_des = false;
            if (job[0].key_skills == '' || job[0].key_skills == ' ' || job[0].key_skills == null)
                job[0].key_skills = false;
            if (job[0].skill_des == '' || job[0].skill_des == ' ' || job[0].skill_des == null)
                job[0].skill_des = false;
            if (job[0].how_apply != null)
                job[0].how_apply = anchorme_1.default(job[0].how_apply, {
                    attributes: [
                        function (urlObj) {
                            if (urlObj.protocol !== "mailto:")
                                return { name: "target", value: "blank" };
                        }
                    ]
                });
            if (job[0].category == 'Design') {
                var action = "action=//app.mailerlite.com/webforms/submit/y3o3u1 data-id=479615 data-code=y3o3u1 target=_blank";
            }
            if (job[0].category == 'Programming') {
                var action = "action=//app.mailerlite.com/webforms/submit/u7w2l0 data-id=479619 data-code=u7w2l0 target=_blank";
            }
            if (job[0].category == 'Customer Support') {
                var action = "action=//app.mailerlite.com/webforms/submit/q7o9w8 data-id=479629 data-code=q7o9w8 target=_blank";
            }
            if (job[0].category == 'Writing') {
                var action = "action=//app.mailerlite.com/webforms/submit/v7f5z5 data-id=479633 data-code=v7f5z5 target=_blank";
            }
            if (job[0].category == 'Devops & Sysadmin') {
                var action = "action=//app.mailerlite.com/webforms/submit/w7p9n0 data-id=479635 data-code=w7p9n0 target=_blank";
            }
            if (job[0].category == 'Business') {
                var action = "action=//app.mailerlite.com/webforms/submit/d0o2y6 data-id=479637 data-code=d0o2y6 target=_blank";
            }
            if (job[0].category == 'Other') {
                var action = "action=//app.mailerlite.com/webforms/submit/j6b3b4 data-id=479639 data-code=j6b3b4 target=_blank";
            }
            if (job[0].url) {
                job[0].anchor_url = anchorme_1.default(job[0].url, {
                    attributes: [
                        {
                            name: 'class',
                            value: 'custom-links'
                        },
                        {
                            name: 'target',
                            value: 'blank'
                        }
                    ]
                });
            }
            res.render('job-details', { data: job, baseprice: setting[0].base_price, baseHref: "/", action: action, img_path: setting[0].img_path });
        });
    });
});
exports.default = jobDetailsRoute;
//# sourceMappingURL=job-details.js.map