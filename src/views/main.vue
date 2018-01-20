<template lang="pug">
    .main
        .main__aside
        .main__content
            .main__header
                search-box(
                    :engineName="config.engineName"
                    :engineNavName="config.engineNavName"
                    @search="onSearchAction"
                    @update="onConfigUpdateAction"
                )
            .main__trending
                github-trending(
                    :lang="config.lang"
                    :since="config.since"
                    @tap="onPageTapAction"
                    @update="onConfigUpdateAction"
                )
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import searchBox from './components/search.vue';
import githubTrending from './components/github-trending.vue';
import storage from '../services/storage';

export default {
    name: 'hero',
    components: { searchBox, githubTrending },
    data() {
        return {
            config: {}
        };
    },
    async mounted() {
        this.config = await storage.getItem('GITHUBER_CONFIGURATION') || {};
    },
    methods: {
        onSearchAction(url) {
            window.open(url);
        },
        onPageTapAction(url) {
            window.open(url);
        },
        async onConfigUpdateAction(item) {
            if (typeof item === 'object') {
                const data = await storage.getItem('GITHUBER_CONFIGURATION') || {};

                storage.setItem('GITHUBER_CONFIGURATION', {
                    ...data,
                    ...item
                });
            }
        }
    },
};
</script>

<style lang="sass">
    @import './main.sass'
</style>
