const nock = require('nock');
const historicalPrice = require('./historical-price.mock');
const multiPrice = require('./multi-price.mock');
const singlePrice = require('./single-price.mock');
const pricingApi = require('./pricing.api');

const mockHistoricalPrice = (times = 1) => {
    nock(pricingApi.baseApi)
        .get(pricingApi.historicalPriceEndpoint)
        .query(true)
        .times(times)
        .reply(200, historicalPrice);
};

const mockSinglePrice = (times = 1) => {
    nock(pricingApi.baseApi)
        .get(pricingApi.singlePriceEndpoint)
        .query(true)
        .times(times)
        .reply(200, singlePrice);
};

const mockMultiPrice = (times = 1) => {
    nock(pricingApi.baseApi)
        .get(pricingApi.multiFullEndpoint)
        .query(true)
        .times(times)
        .reply(200, multiPrice);
};

module.exports = {
    mockHistoricalPrice,
    mockSinglePrice,
    mockMultiPrice
};