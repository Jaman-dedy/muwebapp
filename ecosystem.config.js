const path = '/home/app/2u-web-frontend';

module.exports = {
  apps: [
    {
      name: '2u-web-frontend',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'app',
      host: ['app.2u.money'],
      ref: 'origin/master',
      repo: 'git@gitlab.com:ossix/2u-web-frontend.git',
      path: `${path}/production/`,
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-setup': `rm -rf ${path}/production/source ${path}/production/shared ${path}/production/current ${path}/production/.deploys`,
      'post-setup': 'cp ../../.env .env && yarn && yarn build',
      'pre-deploy-local': "echo 'This is a local executed command'",
      'post-deploy': `yarn install --production && pm2 startOrRestart ecosystem.config.js --env production`,
      env: {
        NODE_ENV: 'production',
      },
    },
    staging: {
      user: 'app',
      host: ['app.2u.money'],
      ref: 'origin/develop',
      repo: 'git@gitlab.com:ossix/2u-web-frontend.git',
      path: `${path}/staging/`,
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-setup': `rm -rf ${path}/staging/source ${path}/staging/shared ${path}/staging/current ${path}/staging/.deploys`,
      'post-setup': 'cp ../../.env .env && yarn && yarn build',
      'pre-deploy-local': "echo 'This is a local executed command'",
      'post-deploy': `pm2 startOrRestart ecosystem.config.js --env staging`,
      env: {
        NODE_ENV: 'staging',
      },
    },
  },
};
