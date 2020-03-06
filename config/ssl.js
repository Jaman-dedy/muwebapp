require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = {
  key: fs.readFileSync(
    path.join(process.cwd(), process.env.SSL_KEY_FILE),
  ),
  cert: fs.readFileSync(
    path.join(process.cwd(), process.env.SSL_CRT_FILE),
  ),
};
