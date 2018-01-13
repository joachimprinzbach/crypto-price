const nock = require('nock');
const expect = require('chai').expect;
const api = require('./deposit.api');
const depositMock = require('./external/binance/deposit.mock');
const priceMock = require('./external/cryptocompare/historical-price.mock');

describe('getDeposit', () => {
   it('should output correct price', (done) => {
       nock('https://api.binance.com')
           .get('/wapi/v3/depositHistory.html')
           .query(true)
           .reply(200, depositMock);
       nock('https://min-api.cryptocompare.com/data')
           .get('/pricehistorical')
           .query(true)
           .times(3)
           .reply(200, priceMock);

        api.getDeposits().then(deposits => {
            let expectedDeposit = { deposits: 91062.1795005 };
            expect(deposits).to.deep.equal(expectedDeposit);
            done();
        });
   })
});