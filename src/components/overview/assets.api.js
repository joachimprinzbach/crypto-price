import Vue from 'vue'

const baseUrl = 'http://localhost:3000/api/';

export default {
    fetchAssets: () => Vue.http.get(`${baseUrl}assets`).then(res => res.json()),
    fetchTrades: (symbol) => Vue.http.get(`${baseUrl}trades/${symbol}`).then(res => res.json())
}