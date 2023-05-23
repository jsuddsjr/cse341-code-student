const process = require('node:process');
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('express:server');
const connect = require('./db/connect.js');

const port = process.env.PORT || 8080;
const app = express();

app
	.use(bodyParser.json())
	.use((request, response, next) => {
		response.setHeader('Access-Control-Allow-Origin', '*');
		next();
	})
	.use('/', require('./routes/index.js'));

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// Handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES': {
			console.error(bind + ' requires elevated privileges');
			break;
		}

		case 'EADDRINUSE': {
			console.error(bind + ' is already in use');
			break;
		}

		default: {
			break;
		}
	}

	throw error;
}

/**
 * Event listener for HTTP server "listening" event.
 */
async function onListening(server) {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug(`Listening on ${bind}`);
}

app.on('error', onError);
app.on('listening', onListening);

debug('Starting connection...');

connect.initDb(error => {
	if (error) {
		debug(error);
		throw error;
	}

	app.listen(port);
	debug(`Connected to DB and listening on ${port}`);
});
