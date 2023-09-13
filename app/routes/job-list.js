"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var models_1 = require("./models");
var jobListRoute = express_1.Router();
/* GET home page. */
jobListRoute.get('/', function (req, res, next) {
    models_1.Job.findAll({
        order: [['id', 'DESC']],
        where: {
            createdAt: {
                $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30)
            }
        }
    }).then(function (jobs) {
        models_1.Settings.findAll({
            where: { id: 1 },
        }).then(function (setting) {
            var featured_job = new Array();
            var featured_job_1, featured_job_2;
            var highlighted_job = new Array();
            var design_job = new Array();
            var program_job = new Array();
            var customer_support_job = new Array();
            var writing_job = new Array();
            var dev_sys_job = new Array();
            var business_job = new Array();
            var other_job = new Array();
            var date = new Array();
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            for (var i = 0; i < jobs.length; i++) {
                if (jobs[i].createdAt.getDate() > (new Date().getDate() - 3))
                    jobs[i].new_post = 1;
                if (jobs[i].highlight_job == 1)
                    jobs[i].highlight_job = true;
                else
                    jobs[i].highlight_job = false;
                if (jobs[i].visa_psponcer == '1')
                    jobs[i].visa_psponcer = true;
                else
                    jobs[i].visa_psponcer = false;
            }
            var d;
            for (var i = 0; i < jobs.length; i++) {
                d = new Date(jobs[i].createdAt);
                if (jobs[i].key_skills != null)
                    jobs[i].key_skills = jobs[i].key_skills.trim();
                else
                    jobs[i].key_skills = undefined;
                if (jobs[i].job_des != null)
                    jobs[i].job_des = jobs[i].job_des.trim();
                else
                    jobs[i].job_des = undefined;
                if (jobs[i].skill_des != null)
                    jobs[i].skill_des = jobs[i].skill_des.trim();
                else
                    jobs[i].skill_des = undefined;
                if (jobs[i].skill_des != null)
                    jobs[i].skill_des = jobs[i].skill_des.trim();
                else
                    jobs[i].skill_des = undefined;
                if (jobs[i].benifit != null)
                    jobs[i].benifit = jobs[i].benifit.trim();
                else
                    jobs[i].benifit = undefined;
                jobs[i].date = month[d.getMonth()] + ' ' + d.getDate();
                jobs[i].page = 0;
                if (jobs[i].key_skills)
                    jobs[i].key_skills = jobs[i].key_skills.split(",");
                if (jobs[i].feature_job) {
                    featured_job.push(jobs[i]);
                }
                if (jobs[i].category == 'Programming' && jobs[i].highlight_job)
                    program_job.push(jobs[i]);
                else if (jobs[i].category == 'Design' && jobs[i].highlight_job)
                    design_job.push(jobs[i]);
                else if (jobs[i].category == 'Other' && jobs[i].highlight_job)
                    other_job.push(jobs[i]);
                else if (jobs[i].category == 'Customer Support' && jobs[i].highlight_job)
                    customer_support_job.push(jobs[i]);
                else if (jobs[i].category == 'Writing' && jobs[i].highlight_job)
                    writing_job.push(jobs[i]);
                else if (jobs[i].category == 'Devops & Sysadmin' && jobs[i].highlight_job)
                    dev_sys_job.push(jobs[i]);
                else if (jobs[i].category == 'Business' && jobs[i].highlight_job)
                    business_job.push(jobs[i]);
            }
            for (var i = 0; i < jobs.length; i++) {
                if (jobs[i].category == 'Programming' && !jobs[i].highlight_job)
                    program_job.push(jobs[i]);
                else if (jobs[i].category == 'Design' && !jobs[i].highlight_job)
                    design_job.push(jobs[i]);
                else if (jobs[i].category == 'Other' && !jobs[i].highlight_job)
                    other_job.push(jobs[i]);
                else if (jobs[i].category == 'Customer Support' && !jobs[i].highlight_job)
                    customer_support_job.push(jobs[i]);
                else if (jobs[i].category == 'Writing' && !jobs[i].highlight_job)
                    writing_job.push(jobs[i]);
                else if (jobs[i].category == 'Devops & Sysadmin' && !jobs[i].highlight_job)
                    dev_sys_job.push(jobs[i]);
                else if (jobs[i].category == 'Business' && !jobs[i].highlight_job)
                    business_job.push(jobs[i]);
            }
            var random = new Array(), temp = [], num = 0;
            for (var i = 0; i < Math.min(4, featured_job.length); i++) {
                num = Math.floor((Math.random() * featured_job.length));
                if (temp.indexOf(num) == -1) {
                    random.push(num);
                    temp.push(num);
                }
                else {
                    i--;
                    continue;
                }
            }
            res.render('job-list', {
                data: jobs,
                random: random,
                program_job: program_job,
                design_job: design_job,
                other_job: other_job,
                customer_support_job: customer_support_job,
                writing_job: writing_job,
                dev_sys_job: dev_sys_job,
                business_job: business_job,
                featured_job: featured_job,
                highlighted_job: highlighted_job,
                baseprice: setting[0].base_price,
                baseHref: "/",
                img_path: setting[0].img_path
            });
        });
    });
});
exports.default = jobListRoute;
//# sourceMappingURL=job-list.js.map