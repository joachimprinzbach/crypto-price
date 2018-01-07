const binance = require('node-binance-api');
const fetch = require('node-fetch');
const config = require('./api.config.json');

binance.options({
    'APIKEY': config.binance.apiKey,
    'APISECRET': config.binance.apiSecret,
    'recvWindow': 60000
});

const base = 'https://api.binance.com/api/';

const currency = 'EUR';

binance.balance((cryptoBalances) => {
    const wallet = [];
    Object.keys(cryptoBalances).forEach(crypto => {
        const amount = cryptoBalances[crypto].available;
        if (amount > 0) {
            wallet.push({
                "sign": crypto,
                "amount": amount
            })
        }
    });
    const commaSeparatedSigns = wallet.map(crypto => crypto.sign).join(',');
    fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${commaSeparatedSigns}&tsyms=${currency}`)
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
        });
});



