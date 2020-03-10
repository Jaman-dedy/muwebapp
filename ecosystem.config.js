module.exports = {
  apps: [
    {
      name: '2u-web-frontend',
      script: 'npm',
      args: 'start',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'webapp',
      host: ['webapp.2u.money'],
      ref: 'origin/develop',
      repo: 'git@gitlab.com:ossix/2u-web-frontend.git',
      path: '/home/webapp/2u-web-frontend/',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-setup':
        'rm -rf 2u-web-frontend/source 2u-web-frontend/shared 2u-web-frontend/current 2u-web-frontend/.deploys',
      'post-setup': 'cp ../.env .env && yarn && yarn build',
      'pre-deploy-local': "echo 'This is a local executed command'",
      'post-deploy':
        'yarn install --production && pm2 startOrRestart ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
