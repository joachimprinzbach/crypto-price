import assetApi from './assets.api';

const state = {
    assets: [],
    trades: [],
    withdrawals: [],
    deposits: []
};

const getters = {
    allAssets: state => state.assets,
    allTrades: state => state.trades,
    allWithdrawals: state => state.withdrawals,
    allDeposits: state => state.deposits
};

const actions = {
    getAllAssets({commit}) {
        return assetApi.fetchAssets().then(assets => {
            commit('RECEIVE_ASSETS', {assets})
        })
    },
    getAllTrades({commit}, symbol) {
        return assetApi.fetchTrades(symbol.sign).then(trades => {
            commit('RECEIVE_TRADES', {trades})
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}