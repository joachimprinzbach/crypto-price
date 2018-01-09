<template>
    <div id="app">
        <v-app>
            <coin-header></coin-header>
            <v-content>
                <v-container fluid fill-height>
                    <v-layout
                            justify-center
                            align-center
                    >
                        <router-view/>
                    </v-layout>
                </v-container>
            </v-content>
            <coin-footer></coin-footer>

        </v-app>
    </div>
</template>

<script>
    import CoinHeader from '@/components/header/Header';
    import CoinFooter from '@/components/footer/Footer';

    export default {
        components: {
            CoinFooter,
            CoinHeader
        },
        name: 'app',
    };
</script>

