const fetch = require('node-fetch');
const Logger = require('../logger');
const currency = 'EUR';
const binance = require('./binance.api');

module.exports = {
    registerEndpoints(app) {
        app.get('/api/trades/:sign',
            (req, res) =>
                getTrades(req.params.sign)
                    .then(trades => res.send(trades))
                    .catch((err) => {
                        Logger.error(err);
                        res.status(500).send('Fetching trades failed!');
                    })
        );
    }
};

const getTrades = (sign) => {
    return Promise.all([binance.getTrades(`${sign}ETH`), binance.getTrades(`${sign}BTC`), binance.getTrades(`${sign}BNB`)])
        .then(resultArr => {
            const trades = [].concat(...resultArr);
            if (trades.forEach)
            trades.forEach(trade => {
                const price = trade.qty * trade.price;
                const tradeTimeInSeconds = Math.round(trade.time / 1000);
                /*return fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${sign}&tsyms=${currency}&ts=${tradeTimeInSeconds}`)
                    .then(res => res.json())
                    .then(json => {
                        const priceInfo = json[buySign] | json[] | json[];
                        sign  if (priceInfo) {
                            const historicalPrice = priceInfo[currency];
                            //console.log(price * historicalPrice);
                            console.log(buySign + "@"+ historicalPrice);
                        } else {
                            console.error(`No historical price found for ${sign} at ${tradeTimeInSeconds}`);
                        }
                    });*/
            });
        return trades;
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

