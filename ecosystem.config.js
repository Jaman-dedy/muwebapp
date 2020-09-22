const path = '/home/webapp/2u-web-frontend';

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
      env_production: {
        NODE_ENV: 'production',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_test: {
        NODE_ENV: 'test',
      },
    },
  ],
  deploy: {
    production: {
      user: 'webapp',
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
      user: 'webapp',
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
    test: {
      user: 'webapp',
      host: ['app.2u.money'],
      ref: process.env.DEPLOY_BRANCH,
      repo: 'git@gitlab.com:ossix/2u-web-frontend.git',
      path: `${path}/test/`,
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-setup': `rm -rf ${path}/test/source ${path}/test/shared ${path}/test/current ${path}/test/.deploys`,
      'post-setup': 'cp ../../.env .env && yarn && yarn build',
      'pre-deploy-local': "echo 'This is a local executed command'",
      'post-deploy': `pm2 startOrRestart ecosystem.config.js --env test`,
      env: {
        NODE_ENV: 'test',
        PORT: process.env.TEST_PORT || '9009',
      },
    },
  },
};
