"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var braintree_gateway_1 = require("./braintree-gateway");
var multer = require("multer");
var multerS3 = require("multer-s3");
var aws = require("aws-sdk");
var models_1 = require("./models");
var twitterAPI = require("node-twitter-api");
var FB = require("fb");
var nodemailer = require("nodemailer");
var AWS_KEY = 'null';
var AWS_SECRET = 'null';
var url = "localhost:3000";
var api = express_1.Router();
aws.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET
});
var s3 = new aws.S3({
    region: 'us-east-2',
    signatureVersion: 'v4'
});
var cv_upload = multer({ dest: 'uploads/' });
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'liongator',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, file.originalname.split('.')[0] + '-' + Date.now() + "." + file.originalname.split('.').pop());
        }
    })
});
var status = '';
var img;
var img_name = '';
var twitter = new twitterAPI({
    consumerKey: 'null',
    consumerSecret: 'null',
});
/* GET job add page. */
api.post('/addJob', function (req, res, next) {
    var datas = req.body;
    var visa = '';
    if (datas.visa_psponcer == 'Yes')
        datas.visa_psponcer = true;
    else
        datas.visa_psponcer = false;
    braintree_gateway_1.gateway.transaction.sale({
        amount: req.body.total,
        customer: {
            company: datas.about_company,
            email: datas.company_email
        },
        paymentMethodNonce: datas.payment_method_nonce,
        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
        if (err) {
            console.log("Err: " + err);
            res.status(500).send({ error: "Transaction Decline" });
            return;
        }
        datas.payment_info = JSON.stringify(result);
        console.log("Payment Succeed:");
        datas.payment_info = JSON.stringify(result);
        models_1.Job.create(datas).then(function (job) {
            res.json(job.dataValues.id);
        });
    });
});
var job_title;
api.post('/postjob', function (req, res, next) {
    models_1.Job.findAll({
        order: [['id', 'DESC']],
    }).then(function (jobs) {
        job_title = jobs[0].job_title.toLowerCase().replace(/ /g, "-");
        status = url + '/job/' + jobs[0].id + "/" + jobs[0].job_title.toLowerCase().replace(/ /g, "-");
        twitter.statuses("update", { status: status }, '2360846922-bkYBG9GGAaoQQkiKd4RGZfcEo72eyzYhuiTdDjx', 'sPhdAR50NacmnxGW0SEhUkULdYhoIIW1bAm8ElPINEwCo', function (error, data, response) {
            if (error) {
                console.log(error);
            }
        });
        FB.setAccessToken('EAAZAKZBHERTGwBAEMOnUdZCZAji0E0BZCafyvA2zR13s2b2YtMCsaY0yOt4wmiZBqLhuF7ZAt5ZAdWDBgImputA9DTXHknmpGDMMh7sJmck33d2Kq9PVZAAaBZAUIKwQ9TTBVK0TZCYWhUERwpIeK8gv7m17g7p97GQOR5gWJaJvicR7IinEp4nqln3');
        FB.api('448806832131695/feed', 'post', { link: status }, function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            console.log('Post Id: ' + res.id);
        });
        res.sendStatus(200);
    });
});
api.post('/addFile', upload.single('companyPic'), function (req, res, next) {
    var img_name = req.file.location.lastIndexOf("/");
    img_name = req.file.location.substr(img_name, req.file.location.length);
    console.log(img_name);
    models_1.Job.update({
        user_image: img_name
    }, {
        where: {
            id: req.body.id
        }
    }).then(function () {
        console.log("File uploaded");
        res.sendStatus(200);
    });
});
api.post('/editprice', function (req, res, next) {
    models_1.Settings.update({
        base_price: req.body.base_price,
        highlighted_job_price: req.body.highlighted_job_price,
        featured_job_price: req.body.featured_job_price
    }, {
        where: { id: 1 }
    }).then(function (setting) {
        res.sendStatus(200);
    });
});
api.post('/editjob/:id', function (req, res, next) {
    var data = req.body;
    delete req.body.createddAt;
    models_1.Job.update(data, {
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.sendStatus(200);
    });
});
api.post('/nodemailer', function (req, res, next) {
    models_1.Subscribe.findAll({
        where: {
            category: req.body.category,
            help: 0
        },
    }).then(function (subscribe) {
        subscribe = subscribe.map(function (x) {
            return x.email;
        }).join(", ");
        var text = "Hi!, \nWelcome to Job Board! Thank you for joining us. \nNew Job posted on Job Board in " + req.body.category + " Category. \n Please check" + url + "/job/" + req.body.id + "/" + job_title + "\nHave an awesome day! \n The Job Board Team";
        var html = "<p>Hi!</p><p>Welcome to Job Board! Thank you for joining us.</p><p>New Job posted on Job Board in " + req.body.category + " Category. </p>Please check <a href='" + url + "/job/" + req.body.id + "/" + job_title + "'>" + url + "/job/" + req.body.id + "/" + job_title + "</a>\n <p>Have an awesome day!</p><p>The Job Board Team</p>";
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: 'email-smtp.us-east-1.amazonaws.com',
            port: 465,
            secure: true,
            auth: {
                user: 'AKIAJYUE65URH5VKHNFQ',
                pass: 'AoXeuvHjwh3mjK85TvKt6rY8eqYXxCkOL7C/KIf2123O'
            }
        });
        // setup email data with unicode symbols
        var mailOptions = {
            from: 'job-applicant@onlyremotejobs.com',
            to: subscribe,
            subject: 'Job Alerts',
            text: text,
            html: html // html body
        };
        res.sendStatus(200);
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    });
});
api.post('/email_help', function (req, res, next) {
    models_1.Subscribe.findAll({
        where: {
            email: req.body.email
        },
    }).then(function (subscribe) {
        var id;
        for (var i = 0; i < subscribe.length; i++) {
            if (req.body.category.indexOf(subscribe[i].category) != -1) {
                id = subscribe[i].id;
                models_1.Subscribe.update({ help: 1 }, {
                    where: {
                        id: id
                    }
                }).then(function (subscribe) {
                    res.sendStatus(200);
                });
                return;
            }
        }
        models_1.Subscribe.create({ email: req.body.email, category: req.body.category, help: 1 }).then(function (subscribe) {
            res.sendStatus(200);
        });
    });
});
api.post('/subscribe', function (req, res, next) {
    models_1.Subscribe.findAll({
        where: {
            email: req.body.email
        },
    }).then(function (subscribe) {
        for (var i = 0; i < subscribe.length; i++) {
            if (req.body.category.indexOf(subscribe[i].category) != -1)
                return false;
        }
        models_1.Subscribe.create({ email: req.body.email, category: req.body.category, help: 0 }).then(function (subscribe) {
            res.sendStatus(200);
        });
    });
});
api.post('/sendEmailDirectly', cv_upload.array('resume', 1), function (req, res, next) {
    var transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
            user: 'AKIAJYUE65URH5VKHNFQ',
            pass: 'AoXeuvHjwh3mjK85TvKt6rY8eqYXxCkOL7C/KIf2123O'
        }
    });
    var text = "Hello, \nI am " + req.body.name + ".\n" + req.body.cover_letter + "\nRegards,\n" + req.body.name + "(" + req.body.email + ")";
    var html = "<p>Hello,</p> <p>I am <strong>" + req.body.name + "(" + req.body.email + ")" + "</strong>.</p><p>" + req.body.cover_letter + "</p><p>Regards,<p>" + req.body.name + "</p></p>";
    // setup email data with unicode symbols
    var mailOptions = {
        from: 'job-applicant@onlyremotejobs.com',
        to: req.body.email_to,
        subject: 'An application for ' + req.body.job_title,
        text: text,
        html: html,
    };
    if (req.files.length > 0) {
        mailOptions.attachments = [
            {
                filename: req.files[0].originalname,
                path: req.files[0].path
            },
        ];
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        res.sendStatus(200);
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
});
api.get('/rssfeed/:category', function (req, res, next) {
    var category_old = ['design', 'programming', 'customer-support', 'writing', 'devops-and-sysadmin', 'business', 'other'];
    var index = category_old.indexOf(req.params.category);
    var category_list = ['Design', 'Programming', 'Customer Support', 'Writing', 'Devops & Sysadmin', 'Business', 'Other'];
    var category = category_list[index];
    //category = category.replace(/&/g, "&amp;");
    models_1.Job.findAll({
        where: {
            category: category
        }
    }).then(function (jobs) {
        var rss = '<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel xmlns:xlink="http://www.w3.org/1999/xlink">\n<title>' + category.replace(/&nbsp/g, " ").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</title>\n<link>' + url + '</link>\n<description>Job posting site</description>\n';
        rss = rss + '<atom:link href="' + url + '" rel="self" type="application/rss+xml" />\n';
        for (var i = 0; i < jobs.length; i++) {
            if (jobs[i].job_title != null)
                jobs[i].job_title = jobs[i].job_title.replace(/&nbsp/g, " ").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            if (jobs[i].job_des != null)
                jobs[i].job_des = jobs[i].job_des.replace(/&nbsp/g, " ").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            rss = rss + '<item>\n<title>' + jobs[i].job_title + '</title>\n<link>' + url + '/job/' + jobs[i].id + '/' + jobs[i].job_title.replace(/ /g, "-").toLowerCase() + '</link>\n<description>' + jobs[i].job_des + '</description>\n <guid>' + url + '/job/' + jobs[i].id + '/' + jobs[i].job_title.replace(/ /g, "-").toLowerCase() + '</guid>\n</item>\n';
        }
        rss = rss + '</channel>\n</rss>';
        res.set('Content-Type', 'text/xml');
        res.send(rss);
    });
});
api.get('/deletejob/:id', function (req, res, next) {
    models_1.Job.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.sendStatus(200);
    });
});
exports.default = api;
//# sourceMappingURL=api.js.map