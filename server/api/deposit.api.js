const Logger = require('../logger');
const binance = require('./binance.api');
const pricing = require('./pricing.api');

const currency = 'EUR';

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
    }
};

const getDeposits = () => {
    return binance.getAllDeposits().then(result => {
        const deposits = result.depositList;
        const priceInfoPromises = deposits.map(deposit => {
            const depositTimeInSeconds = Math.round(deposit.insertTime / 1000);
            return pricing.getHistoricalPrice(deposit.asset, currency, depositTimeInSeconds)
        });
        return Promise.all(priceInfoPromises).then(res => {
            const items = priceInfoPromises.length;
            for (let i = 0; i < items; i++) {
                const priceInfo = res[i][deposits[i].asset];
                if (priceInfo) {
                    const historicalPrice = priceInfo[currency];
                    deposits[i].transactionValue = historicalPrice * deposits[i].amount;
                } else {
                    console.error(`No historical price found for ${deposits[i].asset} at ${deposits[i].insertTime}`);
                }
            }
            const sum = (a, b) => a + b;
            return {deposits: deposits.map(deposit => deposit.transactionValue).reduce(sum)};
        });
    });
};
