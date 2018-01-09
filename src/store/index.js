import Vue from 'vue'
import Vuex from 'vuex'
import overview from '../components/overview/overview.state'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        overview
    }
})