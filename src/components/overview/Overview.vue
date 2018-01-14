<template>
    <div>
        <h1>Your Binance Assets (Refresh if total calculation does not work on first try)</h1>
        <v-data-table
                v-bind:headers="headers"
                :items="assets"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.asset }}</td>
                <td class="text-xs-right">{{props.item.amount | round(4)}}</td>
                <td class="text-xs-right">{{ props.item.price | round(2) }} €</td>
                <td class="text-xs-right">{{ props.item.credit | round(2) }} €</td>
                <td class="text-xs-right"><span v-bind:class="[props.item.change24 > 0 ? 'green--text' : 'red--text']">{{ props.item.change24 }} %</span></td>
                <td class="text-xs-right"> <v-btn color="primary" v-bind:to="'/detail/'+props.item.asset">Show details for {{props.item.asset}}</v-btn></td>
            </template>
            <template slot="footer">
                <td>
                    <strong>Total amount: {{assets.map(a => a.credit).reduce((a1, a2) => a1 + a2, 0) | round(2)}} €</strong>
                </td>
                <td>
                    <strong>Deposits: {{depositSum.deposits | round(2)}} €</strong>
                </td>
                <td>
                    <strong>Withdrawals: {{withdrawalSum.withdrawals | round(2)}} €</strong>
                </td>
                <td>
                    <strong>Saldo: {{(assets.map(a => a.credit).reduce((a1, a2) => a1 + a2, 0) - depositSum.deposits + withdrawalSum.withdrawals) | round(2)}} €</strong>
                </td>
                <td>
                    <strong>Gain / Loss: {{(((assets.map(a => a.credit).reduce((a1, a2) => a1 + a2, 0)) - (depositSum.deposits + withdrawalSum.withdrawals)) / (assets.map(a => a.credit).reduce((a1, a2) => a1 + a2, 0)) * 100) | round(2)}} %</strong>
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
            assets: 'allAssets',
            depositSum: 'depositSum',
            withdrawalSum: 'withdrawalSum'
        }),
        created() {
            this.$store.dispatch('getAllAssets'),
            this.$store.dispatch('getDepositSum'),
            this.$store.dispatch('getWithdrawalSum')
        },
        data() {
            return {
                headers: [
                    {text: 'Asset', value: 'asset'},
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

