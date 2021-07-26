'use strict';

// Run application
const app = require('./app')
const config = require('./config');

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port))