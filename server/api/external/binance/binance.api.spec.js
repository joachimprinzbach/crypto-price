const expect = require('chai').expect;
const api = require('./binance.api');

describe('buildQuery', () => {
    it('should return a concatenated query string', () => {
        const queryString = api.buildQuery({asset: 'BTC', currency: 'EUR'});

        expect(queryString).to.equal('asset=BTC&currency=EUR');
    })
});
