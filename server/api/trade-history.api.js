const Logger = require('../logger');
const binance = require('./external/binance/binance.api');
const pricing = require('./external/cryptocompare/pricing.api');

const currency = 'EUR';

module.exports = {
    registerEndpoints(app) {
        app.get('/api/trades/:sign',
            (req, res) =>
                getTrades(req.params.sign)
                    .then(trades => res.json(trades))
                    .catch((err) => {
                        Logger.error(err);
                        res.sendStatus(500).send('Fetching trades failed!');
                    })
        );
    }
};

const adjustTimestamp = (timestamp) => {
    return Math.round(timestamp / 1000);
};

const mapToPair = (trade, from, to) => {
    trade.pair = {
        from: from,
        to: to
    };
    return trade;
};

const getTrades = (sign) => {
    return Promise.all(
        [
            binance.getTrades(`${sign}ETH`),
            binance.getTrades(`${sign}BTC`),
            binance.getTrades(`${sign}BNB`),
            binance.getDeposits(sign),
            binance.getWithdrawals(sign),
            pricing.getSinglePrice(sign, currency)
        ]
    )
        .then(resultArr => {
            resultArr = resultArr.map(arr => {
                if (Array.isArray(arr)) {
                    return arr;
                } else if (Array.isArray(arr.withdrawList)) {
                    return arr.withdrawList;
                } else if (Array.isArray(arr.depositList)) {
                    return arr.depositList;
                } else if (arr[currency]) {
                    return arr[currency];
                } else {
                    return [];
                }
            });
            const trades = []
                .concat(resultArr[0].map(trade => mapToPair(trade, sign, 'ETH')))
                .concat(resultArr[1].map(trade => mapToPair(trade, sign, 'BTC')))
                .concat(resultArr[2].map(trade => mapToPair(trade, sign, 'BNB')));
            const deposits = resultArr[3];
            const withdrawals = resultArr[4];
            const currentMarketPrice = resultArr[5];

            const pricePromises = trades.map(trade => {
                const tradeTimeInSeconds = Math.round(trade.time / 1000);
                const cachedPrice = pricing.getCachedPrice(sign, currency, tradeTimeInSeconds);
                if(cachedPrice) {
                    return Promise.resolve(cachedPrice);
                } else {
                    return pricing.getHistoricalPrice(sign, currency, tradeTimeInSeconds);
                }
            });

            return Promise.all(pricePromises)
                .then(res => {
                    const items = pricePromises.length;
                    for (let i = 0; i < items; i++) {
                        const priceInfo = res[i][trades[i].pair.from];
                        const tradeTimeInSeconds = Math.round(trades[i].time / 1000);
                        if (priceInfo) {
                            const historicalPrice = priceInfo[currency];
                            const cachedPrice = pricing.getCachedPrice(sign, currency, tradeTimeInSeconds);
                            if(!cachedPrice) {
                                pricing.cachePrice(sign, currency, tradeTimeInSeconds, res[i]);
                            }
                            trades[i].transactionValue = historicalPrice * trades[i].qty;
                            trades[i].currentValue = currentMarketPrice * trades[i].qty;
                        } else {
                            console.error(`No historical price found for ${sign} at ${tradeTimeInSeconds}`);
                        }
                    }
                    return {
                        trades: trades
                            .filter(trade => trade.id)
                            .map(trade => {
                                trade.time = adjustTimestamp(trade.time);
                                return trade;
                            }),
                        withdrawals: withdrawals.map(withdrawal => {
                            withdrawal.successTime = adjustTimestamp(withdrawal.successTime);
                            withdrawal.applyTime = adjustTimestamp(withdrawal.applyTime);
                            return withdrawal;
                        }),
                        deposits: deposits.map(deposit => {
                            deposit.insertTime = adjustTimestamp(deposit.insertTime);
                            return deposit;
                        }),
                    }

                });
        });
};

/*const debouncedLogHistoricalPrices = (cryptoSign, buySign, credit) => {
    return limiter.removeTokens(1, (err, remRequests) => {
        return logHistoricalPrices(cryptoSign, buySign, credit);
    });
};*/

