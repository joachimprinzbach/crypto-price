const nock = require('nock');
const expect = require('chai').expect;
const api = require('./trade-history.api');
const binanceMock = require('./external/binance/binance.mock');
const pricingMock = require('./external/cryptocompare/pricing.mock');

describe('getTrades', () => {
    it('should output correct trade details for an asset', (done) => {
        binanceMock.mockWithdrawals(1, 'XLM');
        binanceMock.mockDeposits(1, 'XLM');
        binanceMock.mockTrades(3);
        pricingMock.mockSinglePrice(4);
        pricingMock.mockHistoricalPrice(12);

        const expectedResult = {
            "trades": [{
                "id": 448187,
                "orderId": 1392620,
                "price": "0.00021552",
                "qty": "12.00000000",
                "commission": "0.06700000",
                "commissionAsset": "XLM",
                "time": 1513930530,
                "isBuyer": true,
                "isMaker": false,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "ETH"},
                "transactionValue": 5.04,
                "currentValue": 1.6800000000000002
            }, {
                "id": 448194,
                "orderId": 1392620,
                "price": "0.0000552",
                "qty": "76.00000000",
                "commission": "1.07000000",
                "commissionAsset": "XLM",
                "time": 1513930544,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "ETH"},
                "transactionValue": 31.919999999999998,
                "currentValue": 10.64
            }, {
                "id": 448200,
                "orderId": 1392620,
                "price": "0.0000552",
                "qty": "21.00000000",
                "commission": "2.24400000",
                "commissionAsset": "XLM",
                "time": 1513930557,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "ETH"},
                "transactionValue": 8.82,
                "currentValue": 2.9400000000000004
            }, {
                "id": 448205,
                "orderId": 1392620,
                "price": "0.0001552",
                "qty": "1111.00000000",
                "commission": "1.20500000",
                "commissionAsset": "XLM",
                "time": 1513930568,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "ETH"},
                "transactionValue": 466.62,
                "currentValue": 155.54000000000002
            }, {
                "id": 448187,
                "orderId": 1392620,
                "price": "0.00021552",
                "qty": "12.00000000",
                "commission": "0.06700000",
                "commissionAsset": "XLM",
                "time": 1513930530,
                "isBuyer": true,
                "isMaker": false,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "BTC"},
                "transactionValue": 5.04,
                "currentValue": 1.6800000000000002
            }, {
                "id": 448194,
                "orderId": 1392620,
                "price": "0.0000552",
                "qty": "76.00000000",
                "commission": "1.07000000",
                "commissionAsset": "XLM",
                "time": 1513930544,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "BTC"},
                "transactionValue": 31.919999999999998,
                "currentValue": 10.64
            }, {
                "id": 448200,
                "orderId": 1392620,
                "price": "0.0000552",
                "qty": "21.00000000",
                "commission": "2.24400000",
                "commissionAsset": "XLM",
                "time": 1513930557,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "BTC"},
                "transactionValue": 8.82,
                "currentValue": 2.9400000000000004
            }, {
                "id": 448205,
                "orderId": 1392620,
                "price": "0.0001552",
                "qty": "1111.00000000",
                "commission": "1.20500000",
                "commissionAsset": "XLM",
                "time": 1513930568,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "BTC"},
                "transactionValue": 466.62,
                "currentValue": 155.54000000000002
            }, {
                "id": 448187,
                "orderId": 1392620,
                "price": "0.00021552",
                "qty": "12.00000000",
                "commission": "0.06700000",
                "commissionAsset": "XLM",
                "time": 1513930530,
                "isBuyer": true,
                "isMaker": false,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "BNB"},
                "transactionValue": 5.04,
                "currentValue": 1.6800000000000002
            }, {
                "id": 448194,
                "orderId": 1392620,
                "price": "0.0000552",
                "qty": "76.00000000",
                "commission": "1.07000000",
                "commissionAsset": "XLM",
                "time": 1513930544,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "BNB"},
                "transactionValue": 31.919999999999998,
                "currentValue": 10.64
            }, {
                "id": 448200,
                "orderId": 1392620,
                "price": "0.0000552",
                "qty": "21.00000000",
                "commission": "2.24400000",
                "commissionAsset": "XLM",
                "time": 1513930557,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "BNB"},
                "transactionValue": 8.82,
                "currentValue": 2.9400000000000004
            }, {
                "id": 448205,
                "orderId": 1392620,
                "price": "0.0001552",
                "qty": "1111.00000000",
                "commission": "1.20500000",
                "commissionAsset": "XLM",
                "time": 1513930568,
                "isBuyer": true,
                "isMaker": true,
                "isBestMatch": true,
                "pair": {"from": "XLM", "to": "BNB"},
                "transactionValue": 466.62,
                "currentValue": 155.54000000000002
            }],
            "withdrawals": [{
                "amount": 100.899,
                "address": "hash",
                "successTime": 1515533605,
                "addressTag": "55885588",
                "txId": "txid",
                "id": "id",
                "asset": "XLM",
                "applyTime": 1515533195,
                "status": 6
            }],
            "deposits": []
        };

        api.getTrades('XLM').then(trades => {
            expect(trades).to.deep.equal(expectedResult);
            done();
        });
    })
});