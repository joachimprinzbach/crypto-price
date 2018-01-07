const assetApi = require('./binance-assets.api');

module.exports = {
    registerEndpoints(app) {
        assetApi.registerEndpoints(app);
    }
};