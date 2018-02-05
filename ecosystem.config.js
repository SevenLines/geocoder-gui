module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'imposm_geocoder',
            script: './server/app.js',
            env: {
                LISTEN: '3000',
            },
            env_production: {
                LISTEN: '/tmp/imposm_geocoder.sock',
                NODE_ENV: 'production'
            }
        },
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        beta: {
            user: 'visualizer',
            host: 'beta.geodva.com',
            ref: 'origin/master',
            repo: 'git@github.com:SevenLines/geocoder-gui.git',
            path: '/home/visualizer/imposm_geocoder_gui/server',
            'post-deploy': 'cd client ' +
            '&& yarn install ' +
            '&& yarn build cd ../server ' +
            '&& yarn install ' +
            '&& pm2 reload ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'dev'
            }
        }
    }
};
