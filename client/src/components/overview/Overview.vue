<template>
  <div class="hello">
    <h1>BLAAAA</h1>
  <ul>
    <li v-for="asset in assets">
      {{ asset.sign }} - {{ asset.amount}}
    </li>
  </ul>
    <v-btn color="primary">Primary</v-btn>
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

