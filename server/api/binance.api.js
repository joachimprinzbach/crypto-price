const crypto = require('crypto');
const config = require('../../api.config.json');
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
    const signature = crypto.createHmac("sha256", config.binance.apiSecret)
        .update(query)
        .digest("hex");

    return fetch(`${baseBinanceApiUrl + url}?${query}&signature=${signature}`, {
        method: method,
        timeout: 50000,
        headers: {
            'User-Agent': 'Mozilla/4.0 (compatible; Node Binance API)',
            'Content-type': 'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': config.binance.apiKey
        }
    }).then(res => res.json())
};

module.exports = {
    getAccount: () => signedQuery('api/v3/account'),
    getTrades: (symbol) => signedQuery('api/v3/myTrades', {symbol: symbol}),
    getWithdrawals: (asset) => signedQuery('wapi/v3/withdrawHistory.html', {asset: asset}),
    getDeposits: (asset) => signedQuery('wapi/v3/depositHistory.html', {asset: asset})

};