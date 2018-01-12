const Logger = require('../logger');
const binance = require('./binance.api');
const pricing = require('./pricing.api');

const currency = 'EUR';

module.exports = {
    registerEndpoints(app) {
        app.get('/api/withdrawal',
            (req, res) =>
                getWithdrawals()
                    .then(withdrawals => res.json(withdrawals))
                    .catch((err) => {
                        Logger.error(err);
                        res.send(500).send('Fetching withdrawals failed!');
                    })
        );
    }
};

const getWithdrawals = () => {
    return binance.getAllWithdrawals().then(result => {
        const withdrawals = result.withdrawList;
        const priceInfoPromises = withdrawals.map(withdrawal => {
            const withdrawalTimeInSeconds = Math.round(withdrawal.applyTime / 1000);
            return pricing.getHistoricalPrice(withdrawal.asset, currency, withdrawalTimeInSeconds)
        });
        return Promise.all(priceInfoPromises).then(res => {
            const items = priceInfoPromises.length;
            for (let i = 0; i < items; i++) {
                const priceInfo = res[i][withdrawals[i].asset];
                if (priceInfo) {
                    const historicalPrice = priceInfo[currency];
                    withdrawals[i].transactionValue = historicalPrice * withdrawals[i].amount;
                } else {
                    console.error(`No historical price found for ${withdrawals[i].asset} at ${withdrawals[i].applyTime}`);
                }
            }
            const sum = (a, b) => a + b;
            return {withdrawals:withdrawals.map(withdrawal => withdrawal.transactionValue).reduce(sum)};
        });
    });
};
