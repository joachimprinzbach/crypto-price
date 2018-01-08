const fetch = require('node-fetch');
const Logger = require('../logger');
const currency = 'EUR';
const binance = require('./binance.api');

module.exports = {
    registerEndpoints(app) {
        app.get('/api/assets',
            (req, res) =>
                getAssets()
                    .then(assets => res.send(assets))
                    .catch((err) => {
                        Logger.error(err);
                        res.status(500).send('Fetching assets failed!');
                    })
        );
    }
};

const getAssets = () => {
    return binance.getAccount().then(account => {
        const wallet = account.balances
            .filter(crypto => crypto.free > 0)
            .map(crypto => {
                return {
                    sign: crypto.asset,
                    amount: crypto.free
                }
            });
        const commaSeparatedSigns = wallet.map(crypto => crypto.sign).join(',');
        return fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${commaSeparatedSigns}&tsyms=${currency}`)
            .then(res => res.json())
            .then(json => {
                wallet.map(crypto => {
                    const priceInfo = json.RAW[crypto.sign];
                    if (priceInfo) {
                        crypto.price = priceInfo[currency].PRICE;
                        crypto.change24 = Math.round(priceInfo[currency].CHANGEPCT24HOUR * 100) / 100;
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


/*const debouncedLogHistoricalPrices = (cryptoSign, buySign, credit) => {
    return limiter.removeTokens(1, (err, remRequests) => {
        return logHistoricalPrices(cryptoSign, buySign, credit);
    });
};

const logHistoricalPrices = (cryptoSign, buySign, credit) => {
    return binance.trades(`${cryptoSign}${buySign}`, (trades, symbol) => {
        if (trades.forEach)
            trades.forEach(trade => {
                const price = trade.qty * trade.price;
                const tradeTimeInSeconds = Math.round(trade.time / 1000);
                return fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${buySign}&tsyms=${currency}&ts=${tradeTimeInSeconds}`)
                    .then(res => res.json())
                    .then(json => {
                        const priceInfo = json[buySign];
                        if (priceInfo) {
                            const historicalPrice = priceInfo[currency];
                            //console.log(price * historicalPrice);
                            console.log(buySign + "@"+ historicalPrice);
                        } else {
                            console.error(`No historical price found for ${symbol} at ${tradeTimeInSeconds}`);
                        }
                    });
            });
    });
};*/

