const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const httpStatus = require('http-status');
const morgan = require('../config/morgan');
const routesv1 = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middleware/error');
const ApiError = require('./utils/ApiError');
const { checkUserAuthStatus } = require('./middleware/auth.middleware');

const app = express();

global.__basedir = __dirname + "/..";
console.log(__basedir);
app.use(express.static(`${__dirname}/assets`))

// Logger
app.use(morgan.successHandler);
app.use(morgan.errorHandler);


// set security HTTP headers
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//   exposedHeaders: 'refresh_token,role_id',
//   origin: true,
//   credentials: true,
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error())
//     }
//   }
// }

var whitelist = []; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions));
// cookieParser
app.use(cookieParser())


// This overrides the default error handler, and must be called _last_ on the app
app.use(function customErrorHandler(err, req, res, next) {
  let output = { meta: { status: '', message: '' }, data: [] };
  output.meta.status = 400;
  output.meta.message = err.message;
  res.status(400).send(output);
  return false;
});



// IsAuth 
// app.use(checkUserAuthStatus);


// app.use(requestLoggerMiddleware)


// v1 api routes
app.use('/api', routesv1);




// send back a 404 error for any unknown api request
// app.use('*', (req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


app.get(["/", "/api/health"], (req, res) => {
  res.send({ message: "OK", uptime: process.uptime() });
});

module.exports = app;


// app.listen(config.port, () => {
//   console.log(
//     `Server listening on http://localhost:${config.port}`,
//   );
// });

