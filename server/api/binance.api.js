const crypto = require('crypto');
const apiKey = process.env.API_KEY || require('../../api.config.json').binance.apiKey;
const secret = process.env.API_SECRET || require('../../api.config.json').binance.apiSecret;
const baseBinanceApiUrl = 'https://api.binance.com/';
const fetch = require('node-fetch');

const signedQuery = (url, data = {}, method = 'GET') => {
    data.timestamp = new Date().getTime();
    data.recvWindow = 60000;
    const query = Object.keys(data)
        .reduce((a, k) => {
            a.push(k + '=' + encodeURIComponent(data[k]));
            return a;
        }, [])
        .join('&');
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

module.exports = {
    getAccount: () => signedQuery('api/v3/account'),
    getTrades: (symbol) => signedQuery('api/v3/myTrades', {symbol: symbol}),
    getWithdrawals: (asset) => signedQuery('wapi/v3/withdrawHistory.html', {asset: asset}),
    getAllWithdrawals: () => signedQuery('wapi/v3/withdrawHistory.html'),
    getDeposits: (asset) => signedQuery('wapi/v3/depositHistory.html', {asset: asset}),
    getAllDeposits: () => signedQuery('wapi/v3/depositHistory.html')

};