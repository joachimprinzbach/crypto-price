const express = require('express');
const Logger = require('./logger');
const api = require('./api');

const app = express();
app.use('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

api.registerEndpoints(app);

const server = app.listen(process.env.PORT || 3000, () => {
    Logger.info(`Listening on port ${server.address().port}`);
});