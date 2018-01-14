const nock = require('nock');
const expect = require('chai').expect;
const api = require('./withdrawal.api');
const binanceMock = require('./external/binance/binance.mock');
const pricingMock = require('./external/cryptocompare/pricing.mock');

describe('getWithdrawals', () => {
    it('should output correct price', (done) => {
        binanceMock.mockWithdrawals();
        pricingMock.mockHistoricalPrice(2);

        api.getWithdrawals().then(withdrawals => {
            let expectedWithdrawal = {withdrawals: 56.40258};
            expect(withdrawals).to.deep.equal(expectedWithdrawal);
            done();
        });
    })
});