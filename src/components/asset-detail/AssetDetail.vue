<template>
    <div>
        <h1>Asset Details for {{ $route.params.sign }}</h1>
        <v-data-table
                v-bind:headers="headers"
                :items="trades"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.time | moment("DD.MM.YYYY - HH:mm:ss") }}</td>
                <td class="text-xs-right">{{ props.item.pair.from }}/{{props.item.pair.to}}</td>
                <td v-if="props.item.isBuyer" class="text-xs-right"><v-icon color="green">playlist_add</v-icon> - Buy</td>
                <td v-if="!props.item.isBuyer" class="text-xs-right"><v-icon color="red">remove_circle</v-icon> - Sell</td>
                <td class="text-xs-right">{{ props.item.price}} {{props.item.pair.to}}</td>
                <td class="text-xs-right">{{ Math.round(props.item.qty * 10 / 10) }}</td>
                <td class="text-xs-right">{{ Math.round(props.item.qty * 10 / 10) *  props.item.price}} {{props.item.pair.to}}</td>
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
                    {text: 'Time', value: 'time'},
                    {text: 'Pair', value: 'pair'},
                    {text: 'Order', value: 'order'},
                    {text: 'Price', value: 'price'},
                    {text: 'Amount', value: 'amount'},
                    {text: 'Total', value: 'total'}
                ]
            }
        }
    };
</script>

