const nock = require('nock');
const expect = require('chai').expect;
const api = require('./asset.api');
const binanceMock = require('./external/binance/binance.mock');
const pricingMock = require('./external/cryptocompare/pricing.mock');

describe('getAssets', () => {
    it('should output correct price', (done) => {
        pricingMock.mockMultiPrice();
        binanceMock.mockAccount();

        api.getAssets().then(assets => {
            let expectedAssets = [
                {
                    "asset": "BTC",
                    "amount": "0.00181758",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 2.03
                },
                {
                    "asset": "LTC",
                    "amount": "0.02570000",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 28.66
                },
                {
                    "asset": "ETH",
                    "amount": "0.00019873",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 0.22
                },
                {
                    "asset": "BNB",
                    "amount": "9.86910724",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 11004.94
                },
                {
                    "asset": "EOS",
                    "amount": "51.95073400",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 57929.74
                },
                {
                    "asset": "TRX",
                    "amount": "343.50000000",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 383033.42
                }
            ];
            expect(assets).to.deep.equal(expectedAssets);
            done();
        });
    })
});
