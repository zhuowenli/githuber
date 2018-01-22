<template lang="pug">
    .main
        .main__aside
            bookmark(@tap="onlinkTapAction")
        .main__content
            .main__header
                search-box(
                    :engineName="config.engineName"
                    :engineNavName="config.engineNavName"
                    @search="onSearchAction"
                    @update="onConfigUpdateAction"
                )
                .search-border(:class="config.engineName")
            .main__trending
                github-trending(
                    :lang="config.lang"
                    :since="config.since"
                    @tap="onlinkTapAction"
                    @update="onConfigUpdateAction"
                )
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
import searchBox from './components/search.vue';
import githubTrending from './components/github-trending.vue';
import bookmark from './components/bookmark.vue';
import storage from '../services/storage';
import config from '../services/config';

export default {
    name: 'hero',
    components: { searchBox, githubTrending, bookmark },
    data() {
        return {
            config: storage.getItem('GITHUBER_CONFIGURATION') || config
        };
    },
    mounted() {
    },
    methods: {
        // 搜索事件
        onSearchAction(url) {
            if (this.config.openSearchInNewTap) {
                window.open(url);
            } else {
                window.location.href = url;
            }
        },
        // 点击链接
        onlinkTapAction(url) {
            if (this.config.openLinkInNewTap) {
                window.open(url);
            } else {
                window.location.href = url;
            }
        },
        async onConfigUpdateAction(item) {
            if (typeof item === 'object') {
                this.config = { ...this.config, ...item };
                storage.setItem('GITHUBER_CONFIGURATION', this.config);
            }
        }
    },
};
</script>

<style lang="sass">
    @import './main.sass'
</style>
