const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('cse341-code-student:server')
const connect = require('./db/connect.js')

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	// Handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES': {
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		}

		case 'EADDRINUSE': {
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		}

		default: {
			throw error
		}
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */
async function onListening(server) {
	const addr = server.address()
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
	debug('Listening on ' + bind)

  connect.initDb((error) => {
    if (error) {
      console.log(error);
      process.exit(1)
    }
    debug(`Connected to DB and listening on ${port}`);
  });
}

app.listen(port);
app.on('error', onError)
app.on('listening', onListening)

