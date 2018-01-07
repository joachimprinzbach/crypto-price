import assetApi from './assets.api';

const state = {
    assets: []
};

const getters = {
    allAssets: state => state.assets
};

const actions = {
    getAllAssets({commit}) {
        return assetApi.fetchAssets().then(assets => {
            commit('RECEIVE_ASSETS', {assets})
        })
    }
};

const mutations = {
    ['RECEIVE_ASSETS'](state, {assets}) {
        state.assets = assets
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}