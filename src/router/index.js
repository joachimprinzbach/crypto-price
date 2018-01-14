import Vue from 'vue';
import Router from 'vue-router';
import Overview from '@/components/overview/Overview';
import AssetDetail from '@/components/asset-detail/AssetDetail';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Overview',
            component: Overview,
        },
        {
            path: '/detail/:asset',
            name: 'AssetDetail',
            component: AssetDetail,
        }
    ],
});
