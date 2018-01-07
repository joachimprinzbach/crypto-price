<template>
  <div>
    <h1>Your Binance Assets</h1>
  <ul>
    <li v-for="asset in assets">
      {{ asset.sign }}: {{ asset.amount}}, {{asset.price}} -> total: {{asset.credit}} €
    </li>
    <li>Total: {{assets.map(a => a.credit).reduce((a1, a2) => a1 + a2)}} €</li>
  </ul>
    <v-btn color="primary">Dont click me!</v-btn>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'Overview',
    computed: mapGetters({
        assets: 'allAssets'
    }),
    created () {
        this.$store.dispatch('getAllAssets')
    }
};
</script>

