import Vue from 'vue'

export default {
    fetchAssets: () => Vue.http.get('http://localhost:3000/api/assets').then(res => res.json())
}