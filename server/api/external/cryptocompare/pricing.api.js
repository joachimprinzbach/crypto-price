const fetch = require('node-fetch');
const baseApi = 'https://min-api.cryptocompare.com/data/';

const cache = {};

const getCachedPrice = (sign, currency, tradeTimeInSeconds) => {
    return cache[sign + currency + tradeTimeInSeconds];
};

const cachePrice = (sign, currency, tradeTimeInSeconds, price) => {
    cache[sign + currency + tradeTimeInSeconds] = price;
};

const getMultipialPrices = (commaSeparatedSigns, currency) => {
    return fetch(`${baseApi}pricemultifull?fsyms=${commaSeparatedSigns}&tsyms=${currency}`).then(res => res.json());
};

const getSinglePrice = (sign, currency) => {
    return fetch(`${baseApi}price?fsym=${sign}&tsyms=${currency}`).then(res => res.json());
};

const getHistoricalPrice = (sign, currency, tradeTimeInSeconds) => {
    return fetch(`${baseApi}pricehistorical?fsym=${sign}&tsyms=${currency}&ts=${tradeTimeInSeconds}`).then(res => res.json());
};

module.exports = {
    getMultipialPrices,
    getHistoricalPrice,
    getSinglePrice,
    getCachedPrice,
    cachePrice
};