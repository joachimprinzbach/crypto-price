<template>
    <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-title>Coin App</v-toolbar-title>
        <v-btn icon v-bind:to="'/'">
            <v-icon>home</v-icon>
        </v-btn>
    </v-toolbar>
</template>
<script>
    export default {
        name: 'coinHeader',
    }
</script>