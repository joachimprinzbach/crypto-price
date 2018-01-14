const Logger = require('../logger');
const binance = require('./external/binance/binance.api');
const pricing = require('./external/cryptocompare/pricing.api');

const currency = 'EUR';

const accountHasAssets = (crypto) => crypto.free > 0;

const mapToCrypto = (crypto) => {
    return {
        asset: crypto.asset,
        amount: crypto.free,
        price: crypto.price,
        change24: crypto.change24,
        credit: crypto.credit
    }
};

const getAssets = () => {
    return binance.getAccount().then(account => {
        if(!account.balances) {
            throw new Error('Fetching balances from account failed!');
        }
        const wallet = account.balances
            .filter(accountHasAssets)
            .map(mapToCrypto);
        const commaSeparatedSigns = wallet.map(crypto => crypto.asset).join(',');
        return pricing.getMultipialPrices(commaSeparatedSigns, currency)
            .then(json => {
                wallet.map(crypto => {
                    const priceInfo = json.RAW[crypto.asset];
                    if (priceInfo) {
                        crypto.price = priceInfo[currency].PRICE;
                        crypto.change24 = priceInfo[currency].CHANGEPCT24HOUR;
                    } else {
                        console.error(`No price found for ${crypto.asset}`);
                        crypto.price = 0;
                    }
                    crypto.credit = crypto.price * crypto.amount;
                }).sort((crypto1, crypto2) => crypto2.credit - crypto1.credit);
                return wallet;
            });
    });
};

module.exports = {
    registerEndpoints(app) {
        app.get('/api/assets', (req, res) =>
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

