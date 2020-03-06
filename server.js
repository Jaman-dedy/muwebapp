const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const sslConfig = require('./config/ssl');

const app = express();

const port = process.env.PORT || 5000;
const server =
  app.get('env') === 'production'
    ? https.createServer(sslConfig, app)
    : http.createServer(app);

app.use(express.static(path.join(__dirname, 'build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 * Normalize a port into a number, string, or false.
 * @param {int} error The created error.
 * @returns {string} The error message.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind =
    typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.stdout.write(`${bind} requires elevated privileges\n`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.stdout.write(`${bind} is already in use\n`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * @returns {void}
 */
function onListening() {
  return process.stdout.write(`Server is running on port: ${port}\n`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
