<template>
    <div>
        <h1>Your Binance Assets</h1>
        <v-data-table
                v-bind:headers="headers"
                :items="assets"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.sign }}</td>
                <td class="text-xs-right">{{ Math.round(props.item.amount * 10 / 10) }}</td>
                <td class="text-xs-right">{{ props.item.price }} €</td>
                <td class="text-xs-right">{{ props.item.credit }} €</td>
                <td class="text-xs-right"  v-bind:class="[props.item.change24 > 0 ? 'green' : 'red']">{{ props.item.change24 }} %</td>
                <td class="text-xs-right"> <v-btn color="primary" v-bind:to="'/detail/'+props.item.sign">Show details for {{props.item.sign}}</v-btn></td>
            </template>
            <template slot="footer">
                <td colspan="100%">
                    <strong>Total amount: {{assets.map(a => a.credit).reduce((a1, a2) => a1 + a2, 0)}} €</strong>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Overview',
        computed: mapGetters({
            assets: 'allAssets'
        }),
        created() {
            this.$store.dispatch('getAllAssets')
        },
        data() {
            return {
                headers: [
                    {text: 'Sign', value: 'sign'},
                    {text: 'Amount of Coins', value: 'amount'},
                    {text: 'Current Price', value: 'single'},
                    {text: 'Total price', value: 'total'},
                    {text: '24 Hour Change', value: 'percent'},
                    {text: 'Open Details', value: 'jump'}
                ]
            }
        }
    };
</script>

