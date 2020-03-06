require('dotenv').config();

module.exports = {
  apps: [
    {
      name: '2u-web-frontend',
      script: 'sudo npm',
      args: 'start',
      env: {
        PORT: process.env.PORT || 443,
        NODE_ENV: process.env.NODE_ENV || 'production',
        REACT_APP_API_URL:
          process.env.REACT_APP_API_URL ||
          'https://sandbox.2u.money:9090',
        REACT_APP_LOGIN_NAME: process.env.REACT_APP_LOGIN_NAME,
        REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
        REACT_APP_ID: process.env.REACT_APP_ID,
      },
    },
  ],
};
