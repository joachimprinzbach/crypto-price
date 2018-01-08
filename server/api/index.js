const assetApi = require('./assets.api');
const tradeHistoryApi = require('./trade-history.api');

module.exports = {
    registerEndpoints(app) {
        assetApi.registerEndpoints(app);
        tradeHistoryApi.registerEndpoints(app);
    }
};