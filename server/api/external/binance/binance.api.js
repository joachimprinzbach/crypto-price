const crypto = require('crypto');
const apiKey = process.env.API_KEY || require('../../../../api.config.json').binance.apiKey;
const secret = process.env.API_SECRET || require('../../../../api.config.json').binance.apiSecret;
const baseBinanceApiUrl = 'https://api.binance.com';
const fetch = require('node-fetch');

const buildQuery = (data) => {
    return Object.keys(data)
        .reduce((array, key) => {
            array.push(key + '=' + encodeURIComponent(data[key]));
            return array;
        }, [])
        .join('&');
};

const signedQuery = (url, data = {}, method = 'GET') => {
    data.timestamp = new Date().getTime();
    data.recvWindow = 60000;
    const query = buildQuery(data);
    const signature = crypto.createHmac("sha256", secret)
        .update(query)
        .digest("hex");

    return fetch(`${baseBinanceApiUrl + url}?${query}&signature=${signature}`, {
        method: method,
        timeout: 50000,
        headers: {
            'User-Agent': 'Mozilla/4.0 (compatible; Node Binance API)',
            'Content-type': 'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': apiKey
        }
    }).then(res => res.json())
};

const accountEndpoint = '/api/v3/account';
const tradesEndpoint = '/api/v3/myTrades';
const withdrawalsEndpoint = '/wapi/v3/withdrawHistory.html';
const depositsEndpoint = '/wapi/v3/depositHistory.html';

module.exports = {
    getAccount: () => signedQuery(accountEndpoint),
    getTrades: (symbol) => signedQuery(tradesEndpoint, {symbol: symbol}),
    getWithdrawals: (asset) => signedQuery(withdrawalsEndpoint, {asset: asset}),
    getAllWithdrawals: () => signedQuery(withdrawalsEndpoint),
    getDeposits: (asset) => signedQuery(depositsEndpoint, {asset: asset}),
    getAllDeposits: () => signedQuery(depositsEndpoint),
    buildQuery,
    baseBinanceApiUrl,
    accountEndpoint,
    tradesEndpoint,
    withdrawalsEndpoint,
    depositsEndpoint
};