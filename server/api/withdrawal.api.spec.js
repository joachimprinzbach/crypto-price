const nock = require('nock');
const assert = require('assert');
const api = require('./withdrawal.api');
const withdrawMock = require('./withdrawHistory.mock');
const priceMock = require('./historical-price.mock');

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
            assert.deepEqual(expectedWithdrawal, withdrawals);
            done();
        });
   })
});