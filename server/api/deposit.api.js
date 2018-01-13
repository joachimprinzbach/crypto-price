const Logger = require('../logger');
const binance = require('./external/binance/binance.api');
const pricing = require('./external/cryptocompare/pricing.api');

const currency = 'EUR';

const getDeposits = () => {
    return binance.getAllDeposits().then(result => {
        const deposits = result.depositList;
        const priceInfoPromises = deposits.map(deposit => {
            const depositTimeInSeconds = Math.round(deposit.insertTime / 1000);
            const cachedPrice = pricing.getCachedPrice(deposit.asset, currency, depositTimeInSeconds);
            if(cachedPrice) {
                return Promise.resolve(cachedPrice);
            }
            return pricing.getHistoricalPrice(deposit.asset, currency, depositTimeInSeconds)
        });
        return Promise.all(priceInfoPromises).then(res => {
            const items = priceInfoPromises.length;
            for (let i = 0; i < items; i++) {
                const priceInfo = res[i][deposits[i].asset];
                const depositTimeInSeconds = Math.round(deposits[i].insertTime / 1000);
                if (priceInfo) {
                    const historicalPrice = priceInfo[currency];
                    const cachedPrice = pricing.getCachedPrice(deposits[i].asset, currency, depositTimeInSeconds);
                    if(!cachedPrice) {
                        pricing.cachePrice(deposits[i].asset, currency, depositTimeInSeconds, res[i]);
                    }
                    deposits[i].transactionValue = historicalPrice * deposits[i].amount;
                } else {
                    console.error(`No historical price found for ${deposits[i].asset} at ${depositTimeInSeconds}`);
                }
            }
            const sum = (a, b) => a + b;
            return {deposits: deposits.map(deposit => deposit.transactionValue).reduce(sum)};
        });
    });
};

module.exports = {
    registerEndpoints(app) {
        app.get('/api/deposit',
            (req, res) =>
                getDeposits()
                    .then(deposits => res.json(deposits))
                    .catch((err) => {
                        Logger.error(err);
                        res.sendStatus(500).send('Fetching deposits failed!');
                    })
        );
    },
    getDeposits
};

