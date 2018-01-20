<template lang="pug">
    .main
        .main__aside
        .main__content
            .main__header
                search-box(@search="onSearchAction")
            .main__trending
                github-trending(@tap="onPageTapAction")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import searchBox from './components/search.vue';
import githubTrending from './components/github-trending.vue';

export default {
    name: 'hero',
    components: { searchBox, githubTrending },
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
        onSearchAction(url) {
            window.open(url);
        },
        onPageTapAction(url) {
            console.log(url);
            window.open(url);
        },
    },
};
</script>

<style lang="sass">
    @import './main.sass'
</style>
