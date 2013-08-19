/**
	@fileoverview configuration file for ASQ
**/

'use strict';

module.exports = {
	//Server hostname to which clients have to connect (default: '127.0.0.1')
	//Note this is overwritten by the environment HOST value if it exists.
	host: "127.0.0.1",

	//Port used by the server to listen for http requests (default: 80)
	//Note this is overwritten by the environment HOST value if it exists.
	HTTPPort: 3000,

	//Port used by the server to listen for https requests (default: 443)
	//Note this is overwritten by the environment HOST value if it exists.
	HTTPSPort: 3443,

	//Clients limit (default: 50)
	clientsLimit: 50,

	//HTTPS Settings
	//Enable HTTPS (default: true)
	enableHTTPS: false,
	//Key path needed for HTTPS (default: './ssl/server.key')
	keyPath: "./ssl/server.key",
	//Cert path needed for HTTPS (default: './ssl/server.crt')
	certPath: "./ssl/server.crt",
	//CA path needed for HTTPS (default: './ssl/ca.crt')
	caPath: "./ssl/ca.crt",
	//Request a certificate for HTTPS (default: true)
	requestCert: false,
	//Reject unauthorized requests for HTTPS (default: false)
	rejectUnauthorized: false,

	//MongoDB
	//Hostname of the mongoDB server (default: '127.0.0.1')
	mongoDBServer: "127.0.0.1",
	//Port used by the mongoDB server (default: 27017)
	mongoDBPort: 27017,
	//Database name (default: 'asq')
	dbName: "asq",

	//Slideshow
	//Upload directory.Make sure you have the correct permissions.
	//This should be an absolute path like: '/var/www/asq/slides'
	// without a backslash in the end
	uploadDir: './slides',

	//Logging
	//  Available log level options:
	//	  "silly"
	//	  "debug"
	//	  "verbose"
	//	  "info"
	//	  "warn"
	//	  "error"
	log: {
		//application logging
		application: {
			level: "info",
			file: "log/app.log",
			json: false
		},

		//db logging (Note: only warn and error make sense for db logging)
		db: {
			level: "info",
			file: "log/db.log",
			json: false
		},

		// sockets logging
		// (Note: sockets only support error, warn, info and debug levels.)
		sockets: {
			level: "info",
			file: "log/soc.log",
			json: false
		}
	}
}