module.exports = {
  apps: [
    {
      name: `2u-web-frontend-${process.env.NODE_ENV}`,
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
    },
  ],
};
