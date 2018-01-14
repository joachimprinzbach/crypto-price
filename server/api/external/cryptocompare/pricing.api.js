const fetch = require('node-fetch');
const baseApi = 'https://min-api.cryptocompare.com/data';

const cache = {};
const multiFullEndpoint = '/pricemultifull';
const singlePriceEndpoint = '/price';
const historicalPriceEndpoint = '/pricehistorical';

const getCachedPrice = (sign, currency, tradeTimeInSeconds) => {
    return cache[sign + currency + tradeTimeInSeconds];
};

const cachePrice = (sign, currency, tradeTimeInSeconds, price) => {
    cache[sign + currency + tradeTimeInSeconds] = price;
};

const getMultipialPrices = (commaSeparatedSigns, currency) => {
    return fetch(`${baseApi}${multiFullEndpoint}?fsyms=${commaSeparatedSigns}&tsyms=${currency}`).then(res => res.json());
};

const getSinglePrice = (sign, currency) => {
    return fetch(`${baseApi}${singlePriceEndpoint}?fsym=${sign}&tsyms=${currency}`).then(res => res.json());
};

const getHistoricalPrice = (sign, currency, tradeTimeInSeconds) => {
    return fetch(`${baseApi}${historicalPriceEndpoint}?fsym=${sign}&tsyms=${currency}&ts=${tradeTimeInSeconds}`).then(res => res.json());
};

module.exports = {
    getMultipialPrices,
    getHistoricalPrice,
    getSinglePrice,
    getCachedPrice,
    cachePrice,
    baseApi,
    multiFullEndpoint,
    singlePriceEndpoint,
    historicalPriceEndpoint
};