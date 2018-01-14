const nock = require('nock');
const withdrawals = require('./withdrawHistory.mock');
const account = require('./account.mock');
const deposits = require('./deposit.mock');
const trades = require('./trades.mock');
const binanceApi = require('./binance.api');


const getMockedDeposits = (asset) => {
    if(asset) {
        return {
            ...deposits,
            depositList: deposits.depositList.filter(w => w.asset === asset)
        };
    }
    return deposits;
};

const getMockedWtihdrawals = (asset) => {
    if(asset) {
        return {
            ...withdrawals,
            withdrawList: withdrawals.withdrawList.filter(w => w.asset === asset)
        };
    }
    return withdrawals;
};

const mockWithdrawals = (times = 1, asset) => {
    nock(binanceApi.baseBinanceApiUrl)
        .get(binanceApi.withdrawalsEndpoint)
        .query(true)
        .times(times)
        .reply(200, getMockedWtihdrawals(asset));
};

const mockDeposits = (times = 1, asset) => {
    nock(binanceApi.baseBinanceApiUrl)
        .get(binanceApi.depositsEndpoint)
        .query(true)
        .times(times)
        .reply(200, getMockedDeposits(asset));
};

const mockTrades = (times = 1) => {
    nock(binanceApi.baseBinanceApiUrl)
        .get(binanceApi.tradesEndpoint)
        .query(true)
        .times(times)
        .reply(200, trades);
};

const mockAccount = (times = 1) => {
    nock(binanceApi.baseBinanceApiUrl)
        .get(binanceApi.accountEndpoint)
        .query(true)
        .times(times)
        .reply(200, account);
};

module.exports = {
    mockAccount,
    mockDeposits,
    mockWithdrawals,
    mockTrades
};