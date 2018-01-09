<template>
    <div>
        <h1>Asset Details for {{ $route.params.sign }}</h1>
        <v-data-table
                v-bind:headers="headers"
                :items="trades"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.qty }}</td>
                <td>{{ props.item.price }}</td>
                <td class="text-xs-right">{{ props.item.time }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'AssetDetail',
        computed: mapGetters({
            trades: 'allTrades'
        }),
        created() {
            this.$store.dispatch('getAllTrades', {
                sign: this.$route.params.sign
            })
        },
        data() {
            return {
                headers: [
                    {text: 'Amount', value: 'amount'},
                    {text: 'Price', value: 'price'},
                    {text: 'Time', value: 'time'}
                ]
            }
        }
    };
</script>

