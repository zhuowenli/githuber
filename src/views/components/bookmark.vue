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
                @click="onLinkTapAction(item)"
                @dblclick="onEditAction(item)"
                @contextmenu="onContextMenuAction($event, item)"
                :class="{edit: edit}"
            )
                .el-icon-close(@click.stop="onRemoveAction(item)")
                .logo.shake-constant(v-if="item.logo")
                    img(:src="item.logo")
                .text.shake-constant(v-else) {{item.name[0]}}
                .name {{item.name}}
            .bookmark__item(@click="edit = false" v-if="edit")
                .el-icon-check
            .bookmark__item(@click="onAddAction" v-else)
                .el-icon-plus
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import i18n from '../../services/i18n';

export default {
    name: 'bookmark',
    data() {
        return {
            edit: false
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
            if (!this.edit) {
                this.$emit('tap', item.url);
            }
        },
        onContextMenuAction(e) {
            e.preventDefault();
            this.edit = !this.edit;
        },
        onAddAction() {
            this.$emit('add');
        },
        onEditAction(item) {
            console.log(item);
            this.$emit('edit', item);
        },
        onRemoveAction(item) {
            this.$emit('remove', item);
        },
    }
};
</script>

<style lang="sass">
    @import './bookmark.sass'
</style>
