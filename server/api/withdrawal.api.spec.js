const nock = require('nock');
const expect = require('chai').expect;
const api = require('./withdrawal.api');
const withdrawMock = require('./external/binance/withdrawHistory.mock');
const priceMock = require('./external/cryptocompare/historical-price.mock');

describe('getWithdrawals', () => {
   it('should output correct price', (done) => {
       nock('https://api.binance.com')
           .get('/wapi/v3/withdrawHistory.html')
           .query(true)
           .reply(200, withdrawMock);
       nock('https://min-api.cryptocompare.com/data')
           .get('/pricehistorical')
           .query(true)
           .twice()
           .reply(200, priceMock);

        api.getWithdrawals().then(withdrawals => {
            let expectedWithdrawal = {withdrawals: 56.40258 };
            expect(withdrawals).to.deep.equal(expectedWithdrawal);
            done();
        });
   })
});