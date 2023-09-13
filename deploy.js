const exec = require('child_process').exec;
const path = require('path');
const ElasticBeanstalk = require('elastic-beanstalk.js');

const version = Date.now().toString();
const fileName = version + '.zip';
const fullFilePath = path.join(process.cwd(), fileName)

const elasticBeanstalk = new ElasticBeanstalk({
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION,
        applicationName: process.env.APPLICATION_NAME,
        versionsBucket: process.env.S3_BUCKET
    }
});


console.log('Creating project archive @ %s', fullFilePath);

exec('git archive -o ' + fullFilePath + ' ' + 'master', function (err, stdout, stderr) {
    if (err) {
        console.log(err);
    }

    console.log('Archive created');

    console.log("Deploying to elastic beanstalk");

    elasticBeanstalk.createVersionAndDeploy({
        environment: process.env.APPLICATION_ENVIRONMENT,
        filename: fullFilePath,
        remoteFilename: fileName,
        versionLabel: version
    }).then(function () {
        console.log('Successfully deployed to Elastic Beanstalk');
    }).fail(function (err) {
        console.log('Error in deployment');
        console.log(err);
    });
});