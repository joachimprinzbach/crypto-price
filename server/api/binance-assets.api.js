const fetch = require('node-fetch');
const crypto = require('crypto');
const config = require('../../api.config.json');
const Logger = require('../logger');
const currency = 'EUR';
const baseBinanceApiUrl = 'https://api.binance.com/api/';

module.exports = {
    registerEndpoints(app) {
        app.get('/api/assets',
            (req, res) =>
                getAssets()
                    .then(assets => res.send(assets))
                    .catch((err) => {
                        Logger.error(err);
                        res.status(500).send('Fetching products failed!');
                    })
        );
    }
};

const getAccount = () => {
    return signedQuery('v3/account');
};

const getAssets = () => {
    return getAccount().then(account => {
        const wallet = account.balances
            .filter(crypto => crypto.free > 0)
            .map(crypto => {
                return {
                    sign: crypto.asset,
                    amount: crypto.free
                }
            });
        const commaSeparatedSigns = wallet.map(crypto => crypto.sign).join(',');
        return fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${commaSeparatedSigns}&tsyms=${currency}`)
            .then(res => res.json())
            .then(json => {
                wallet.map(crypto => {
                    const priceInfo = json[crypto.sign];
                    if (priceInfo) {
                        crypto.price = priceInfo[currency];
                    } else {
                        console.error(`No price found for ${crypto.sign}`);
                        crypto.price = 0;
                    }
                    crypto.credit = Math.round(crypto.price * crypto.amount * 100) / 100;
                });
                wallet.sort((crypto1, crypto2) => crypto2.credit - crypto1.credit);
                return Promise.resolve(wallet);
            });
    });
};

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



