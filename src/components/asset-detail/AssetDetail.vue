<template>
    <div>
        <h1>Asset Details for {{ $route.params.sign }}</h1>
        <h2>Transactions</h2>
        <v-data-table
                v-bind:headers="transactionHeaders"
                :items="trades"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.time | moment("DD.MM.YYYY - HH:mm:ss") }}</td>
                <td class="text-xs-right">{{ props.item.pair.from }}/{{props.item.pair.to}}</td>
                <td v-if="props.item.isBuyer" class="text-xs-right green--text body-2"><v-icon color="green">playlist_add</v-icon> - Buy</td>
                <td v-if="!props.item.isBuyer" class="text-xs-right red--text body-2"><v-icon color="red">remove_circle</v-icon> - Sell</td>
                <td class="text-xs-right">{{ props.item.price}} {{props.item.pair.to}}</td>
                <td class="text-xs-right">{{ Math.round(props.item.qty * 10 / 10) }} {{props.item.pair.from}}</td>
                <td class="text-xs-right">{{ Math.round(props.item.qty * 10 / 10) *  props.item.price}} {{props.item.pair.to}}</td>
            </template>
        </v-data-table>
        <h2>Deposits</h2>
        <v-data-table
                v-bind:headers="depositHeaders"
                :items="deposits"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.insertTime | moment("DD.MM.YYYY - HH:mm:ss") }}</td>
                <td class="text-xs-right">{{props.item.amount}} {{props.item.asset}}</td>
                <td class="text-xs-right">{{props.item.address}}</td>
                <td class="text-xs-right">{{props.item.txId}}</td>
            </template>
        </v-data-table>
        <h2>Withdrawals</h2>
        <v-data-table
                v-bind:headers="withdrawalHeaders"
                :items="withdrawals"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.applyTime | moment("DD.MM.YYYY - HH:mm:ss") }}</td>
                <td class="text-xs-right">{{ props.item.successTime | moment("DD.MM.YYYY - HH:mm:ss") }}</td>
                <td class="text-xs-right">{{ props.item.amount }} {{props.item.asset}}</td>
                <td class="text-xs-right">{{props.item.address}}</td>
                <td class="text-xs-right">{{props.item.txId}}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'AssetDetail',
        computed: mapGetters({
            trades: 'allTrades',
            deposits: 'allDeposits',
            withdrawals: 'allWithdrawals'
        }),
        created() {
            this.$store.dispatch('getAllTrades', {
                sign: this.$route.params.sign
            })
        },
        data() {
            return {
                transactionHeaders: [
                    {text: 'Time', value: 'time'},
                    {text: 'Pair', value: 'pair'},
                    {text: 'Order', value: 'order'},
                    {text: 'Price', value: 'price'},
                    {text: 'Amount', value: 'amount'},
                    {text: 'Total', value: 'total'}
                ],
                withdrawalHeaders: [
                    {text: 'Apply Time', value: 'apply'},
                    {text: 'Success Time', value: 'success'},
                    {text: 'Amount', value: 'amount'},
                    {text: 'To', value: 'to'},
                    {text: 'Transaction ID', value: 'txid'}
                ],
                depositHeaders: [
                    {text: 'Time', value: 'time'},
                    {text: 'Amount', value: 'amount'},
                    {text: 'From', value: 'from'},
                    {text: 'Transaction ID', value: 'txid'}
                ]
            }
        }
    };
</script>

