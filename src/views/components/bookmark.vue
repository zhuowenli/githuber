<template lang="pug">
    .bookmark
        iscroll-view(
            :scrollerClass="{scroller: true}"
            :options="{mouseWheel: true, scrollbars: true}"
            ref="scrollView"
        )
            .bookmark__item(
                v-for="(item, inx) in bookmarks"
                :key="inx"
            )
                .logo
                    img(:src="item.logo")
                .name {{item.name}}
            .bookmark__item(@click="onAddAction")
                .el-icon-plus
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import i18n from '../../services/i18n';

export default {
    name: 'bookmark',
    data() {
        return {
        };
    },
    async mounted() {
        this.init();
    },
    computed: {
        ...mapGetters('bookmark', ['bookmarks'])
    },
    methods: {
        ...mapActions('bookmark', ['fetchBookmarks']),
        async init() {
            await this.fetchBookmarks();
            this.$refs.scrollView.refresh();
        },
        onLinkTapAction(item) {
            this.$emit('tap', item.url);
        },
        onAddAction() {
            this.$emit('add');
        },
    }
};
</script>

<style lang="sass">
    @import './bookmark.sass'
</style>
