const Logger = require('../logger');
const binance = require('./external/binance/binance.api');
const pricing = require('./external/cryptocompare/pricing.api');

const currency = 'EUR';

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
        return pricing.getMultipialPrices(commaSeparatedSigns, currency)
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
                }).sort((crypto1, crypto2) => crypto2.credit - crypto1.credit);
                return Promise.resolve(wallet);
            });
    });
};

module.exports = {
    registerEndpoints(app) {
        app.get('/api/assets',
            (req, res) =>
                getAssets()
                    .then(assets => res.json(assets))
                    .catch((err) => {
                        Logger.error(err);
                        res.sendStatus(500).send('Fetching assets failed!');
                    })
        );
    },
    getAssets
};

