const nock = require('nock');
const expect = require('chai').expect;
const api = require('./deposit.api');
const binanceMock = require('./external/binance/binance.mock');
const pricingMock = require('./external/cryptocompare/pricing.mock');

describe('getDeposit', () => {
    it('should output correct price', (done) => {
        binanceMock.mockDeposits();
        pricingMock.mockHistoricalPrice(3);

        api.getDeposits().then(deposits => {
            let expectedDeposit = {deposits: 91062.1795005};
            expect(deposits).to.deep.equal(expectedDeposit);
            done();
        });
    })
});