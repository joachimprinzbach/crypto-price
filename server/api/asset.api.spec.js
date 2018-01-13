const nock = require('nock');
const expect = require('chai').expect;
const api = require('./asset.api');
const accountMock = require('./external/binance/account.mock');
const priceMock = require('./external/cryptocompare/multi-price.mock');

describe('getAssets', () => {
   it('should output correct price', (done) => {
       nock('https://api.binance.com')
           .get('/api/v3/account')
           .query(true)
           .reply(200, accountMock);
       nock('https://min-api.cryptocompare.com/data')
           .get('/pricemultifull')
           .query(true)
           .times(1)
           .reply(200, priceMock);

        api.getAssets().then(assets => {
            let expectedAssets = [
                {
                    "sign": "BTC",
                    "amount": "0.00181758",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 2.03
                },
                {
                    "sign": "LTC",
                    "amount": "0.02570000",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 28.66
                },
                {
                    "sign": "ETH",
                    "amount": "0.00019873",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 0.22
                },
                {
                    "sign": "BNB",
                    "amount": "9.86910724",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 11004.94
                },
                {
                    "sign": "EOS",
                    "amount": "51.95073400",
                    "price": 1115.09,
                    "change24": 8.74,
                    "credit": 57929.74
                },
                {
                    "sign": "TRX",
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
