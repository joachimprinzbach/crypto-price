<template>
    <div>
        <h1>Asset Details for {{ $route.params.sign }}</h1>
        <v-data-table
                v-bind:headers="headers"
                :items="trades"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td>{{ Math.round(props.item.qty * 10 / 10) }}</td>
                <td>{{ props.item.price}}</td>
                <td v-if="props.item.isBuyer" class="text-xs-right"><v-icon color="green">playlist_add</v-icon></td>
                <td v-if="!props.item.isBuyer" class="text-xs-right"><v-icon color="red">remove_circle</v-icon></td>
                <td class="text-xs-right">{{ props.item.time | moment("DD.MM.YYYY - HH:mm:ss") }}</td>
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
                    {text: 'Order', value: 'order'},
                    {text: 'Time', value: 'time'}
                ]
            }
        }
    };
</script>

