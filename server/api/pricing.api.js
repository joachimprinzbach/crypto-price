const fetch = require('node-fetch');
const baseApi = 'https://min-api.cryptocompare.com/data/';

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
    getSinglePrice
};