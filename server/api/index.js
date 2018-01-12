const assetApi = require('./asset.api');
const depositApi = require('./deposit.api');
const withdrawalApi = require('./withdrawal.api');
const tradeHistoryApi = require('./trade-history.api');

module.exports = {
    registerEndpoints(app) {
        assetApi.registerEndpoints(app);
        tradeHistoryApi.registerEndpoints(app);
        withdrawalApi.registerEndpoints(app);
        depositApi.registerEndpoints(app);
    }
};