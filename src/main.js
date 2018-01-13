// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueMoment from 'vue-moment';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Vuetify);
Vue.use(VueMoment);

Vue.filter('round', function(value, decimals) {
    if(!value) {
        value = 0;
    }

    if(!decimals) {
        decimals = 0;
    }

    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return value;
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
});
