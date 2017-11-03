module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const GithubWebhook = require('express-github-webhook');
    const handler = GithubWebhook({path: '/webhook', secret: env.GITSECRET})

    const spawn = require('child_process').spawn;

    router.use(handler);

    console.log('Watching for changes on ' + env.BRANCH);

    handler.on('push', (event, repo, data) => {
        console.log(repo.ref);
        let ref = repo.ref;
        let components = ref.split('/');
        let branch = components[components.length - 1];
        console.log(branch); 

        if(branch === env.BRANCH) {
            let ps = spawn('git', ['pull']);

            ps.stdout.on('data', data => {
                console.log('stdout: ' + data);
            });
            ps.stderr.on('data', data => {
                console.log('stderr: ' + data);
            })
        }
    });


    handler.on('error', (err, req,res) => {
        console.log(err);
        res.status(500);
    })

    return router;
}