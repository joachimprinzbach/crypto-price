const fetch = require('node-fetch');
const crypto = require('crypto');
const config = require('../../api.config.json');
const Logger = require('../logger');

const options = {
    APIKEY: config.binance.apiKey,
    APISECRET: config.binance.apiSecret
};
const base = 'https://api.binance.com/api/';
const currency = 'EUR';
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

const signedQuery = (url, data = {}, method = 'GET') => {
    data.timestamp = new Date().getTime();
    data.recvWindow = 60000;
    const query = Object.keys(data).reduce(function (a, k) {
        a.push(k + '=' + encodeURIComponent(data[k]));
        return a;
    }, []).join('&');
    const signature = crypto.createHmac("sha256", options.APISECRET).update(query).digest("hex");

    return fetch(`${base + url}?${query}&signature=${signature}`, {
        method: method,
        timeout: 50000,
        headers: {
            'User-Agent': 'Mozilla/4.0 (compatible; Node Binance API)',
            'Content-type': 'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': options.APIKEY
        }
    }).then(res => res.json())
};

const getAssets = () => {
    return getAccount().then(account => {
        const wallet = [];
        account.balances.forEach(crypto => {
            const amount = crypto.free;
            if (amount > 0) {
                wallet.push({
                    "sign": crypto.asset,
                    "amount": amount
                })
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
                wallet.forEach(crypto => {
                    console.log(`${crypto.sign}: amount: ${crypto.amount}, price: ${crypto.price} € -> total: ${crypto.credit} €`);
                });
                const totalSum = wallet.map(crypto => crypto.credit).reduce((val1, val2) => val1 + val2);
                console.log(`Total funds: ${totalSum} €`);
                return Promise.resolve(wallet);
            });
    });
}




