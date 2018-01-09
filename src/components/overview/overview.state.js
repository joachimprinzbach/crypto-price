import assetApi from './assets.api';

const state = {
    assets: [],
    trades: []
};

const getters = {
    allAssets: state => state.assets,
    allTrades: state => state.trades
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
        state.trades = trades
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}