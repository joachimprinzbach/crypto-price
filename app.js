const express = require('express');
const serveStatic = require('serve-static');
const Logger = require('./server/logger');
const api = require('./server/api');

const app = express();
app.use('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(serveStatic(__dirname + "/dist"));
api.registerEndpoints(app);

const server = app.listen(process.env.PORT || 3000, () => {
    Logger.info(`Listening on port ${server.address().port}`);
});