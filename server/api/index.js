const orderApi = require('./binance-assets.api');

module.exports = {
    registerEndpoints(app) {
        orderApi.registerEndpoints(app);
    }
};