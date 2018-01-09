import Vue from 'vue'

const baseUrl = '/api/';

export default {
    fetchAssets: () => Vue.http.get(`${baseUrl}assets`).then(res => res.json()),
    fetchTrades: (symbol) => Vue.http.get(`${baseUrl}trades/${symbol}`).then(res => res.json())
}