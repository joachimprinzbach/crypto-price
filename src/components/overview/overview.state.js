import assetApi from './assets.api';

const state = {
    assets: [],
    trades: [],
    withdrawals: [],
    deposits: [],
    depositSum: 0,
    withdrawalSum: 0
};

const getters = {
    allAssets: state => state.assets,
    allTrades: state => state.trades,
    allWithdrawals: state => state.withdrawals,
    allDeposits: state => state.deposits,
    depositSum: state => state.depositSum,
    withdrawalSum: state => state.withdrawalSum
};

const actions = {
    getAllAssets({commit}) {
        return assetApi.fetchAssets().then(assets => {
            commit('RECEIVE_ASSETS', {assets})
        })
    },
    getAllTrades({commit}, symbol) {
        return assetApi.fetchTrades(symbol.asset).then(trades => {
            commit('RECEIVE_TRADES', {trades})
        })
    },
    getDepositSum({commit}) {
        return assetApi.fetchDeposits().then(depositSum => {
            commit('RECEIVE_DEPOSITSUM', {depositSum})
        })
    },
    getWithdrawalSum({commit}) {
        return assetApi.fetchWithdrawals().then(withdrawalSum => {
            commit('RECEIVE_WITHDRAWALSUM', {withdrawalSum})
        })
    }
};

const mutations = {
    ['RECEIVE_ASSETS'](state, {assets}) {
        state.assets = assets
    },
    ['RECEIVE_TRADES'](state, {trades}) {
        state.trades = trades.trades,
        state.withdrawals = trades.withdrawals,
        state.deposits = trades.deposits
    },
    ['RECEIVE_DEPOSITSUM'](state, {depositSum}) {
        state.depositSum = depositSum
    },
    ['RECEIVE_WITHDRAWALSUM'](state, {withdrawalSum}) {
        state.withdrawalSum = withdrawalSum
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}