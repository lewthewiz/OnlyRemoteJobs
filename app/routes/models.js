"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
var MYSQL_USER = process.env.MYSQL_USER || 'root';
var MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'akil1234';
var MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'liongator';
exports.sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 50,
        min: 0,
        maxIdleTime: 10000
    },
});
exports.Job = exports.sequelize.define('create_job', {
    job_title: Sequelize.STRING,
    job_type: Sequelize.STRING,
    category: Sequelize.STRING,
    timezone: Sequelize.STRING,
    currency: Sequelize.STRING,
    min_range: Sequelize.STRING,
    max_range: Sequelize.STRING,
    compensation: Sequelize.STRING,
    visa_psponcer: Sequelize.STRING,
    key_skills: Sequelize.STRING,
    job_des: Sequelize.TEXT,
    how_apply: Sequelize.TEXT,
    email_to: Sequelize.STRING,
    about_company: Sequelize.STRING,
    user_image: Sequelize.STRING,
    tw_user_image: Sequelize.TEXT,
    url: Sequelize.STRING,
    company_email: Sequelize.STRING,
    highlight_job: Sequelize.BOOLEAN,
    feature_job: Sequelize.BOOLEAN,
    payment_info: Sequelize.TEXT
});
exports.Settings = exports.sequelize.define('setting', {
    base_price: Sequelize.STRING,
    highlighted_job_price: Sequelize.STRING,
    featured_job_price: Sequelize.STRING,
    tw_access_token: Sequelize.STRING,
    tw_access_token_secret: Sequelize.STRING,
    fb_access_token: Sequelize.STRING,
    img_path: Sequelize.STRING
});
exports.Subscribe = exports.sequelize.define('subscribe_table', {
    email: Sequelize.STRING,
    category: Sequelize.STRING,
    help: Sequelize.STRING
});
//# sourceMappingURL=models.js.map