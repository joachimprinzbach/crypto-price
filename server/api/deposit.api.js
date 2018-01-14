const Logger = require('../logger');
const binance = require('./external/binance/binance.api');
const pricing = require('./external/cryptocompare/pricing.api');

const currency = 'EUR';
const sum = (a, b) => a + b;

const getDeposits = () => {
    return binance.getAllDeposits().then(result => {
        const deposits = result.depositList;
        console.log(deposits);
        const priceInfoPromises = deposits.map(deposit => {
            const depositTimeInSeconds = Math.round(deposit.insertTime / 1000);
            const cachedPrice = pricing.getCachedPrice(deposit.asset, currency, depositTimeInSeconds);
            if(cachedPrice) {
                return Promise.resolve(cachedPrice);
            }
            return pricing.getHistoricalPrice(deposit.asset, currency, depositTimeInSeconds)
        });
        return Promise.all(priceInfoPromises).then(res => {
            for (let i = 0; i < priceInfoPromises.length; i++) {
                const priceInfo = res[i];
                const assetPrice = priceInfo[deposits[i].asset];
                const depositTimeInSeconds = Math.round(deposits[i].insertTime / 1000);
                if (assetPrice) {
                    const historicalPrice = assetPrice[currency];
                    const cachedPrice = pricing.getCachedPrice(deposits[i].asset, currency, depositTimeInSeconds);
                    if(!cachedPrice) {
                        pricing.cachePrice(deposits[i].asset, currency, depositTimeInSeconds, priceInfo);
                    }
                    deposits[i].transactionValue = historicalPrice * deposits[i].amount;
                } else {
                    console.error(`No historical price found for ${deposits[i].asset} at ${depositTimeInSeconds}`);
                }
            }
            return {deposits: deposits.map(deposit => deposit.transactionValue).reduce(sum)};
        });
    });
};

module.exports = {
    registerEndpoints(app) {
        app.get('/api/deposit', (req, res) =>
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

