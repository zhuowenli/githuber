<template lang="pug">
    iscroll-view.bookmark(
        :scrollerClass="{scroller: true}"
        :options="{mouseWheel: true, scrollbars: true}"
        ref="scrollView"
    )
        draggable(
            v-model="bookmarkLists"
            :options="dragOptions"
        )
            .bookmark__item(
                @contextmenu="toggleEditAction"
                v-for="(item, inx) in bookmarks"
                :key="inx"
                @click="onLinkTapAction(item)"
                @dblclick="onEditAction(item, inx)"
                :class="{edit: edit}"
            )
                .el-icon-close(@click.stop="onRemoveAction(item)")
                .logo.shake-constant(v-if="item.logo")
                    img(:src="item.logo")
                .text.shake-constant(v-else) {{item.name[0]}}
                .name
                    span {{item.name}}
        .bookmark__item(@click="toggleEditAction" v-if="edit")
            .el-icon-check
        .bookmark__item(@click="onAddAction" v-else)
            .el-icon-plus
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import draggable from 'vuedraggable';

export default {
    name: 'bookmark',
    data() {
        return {
            edit: false,
            dragOptions: {
                draggable: '.bookmark__item'
            }
        };
    },
    components: { draggable },
    async mounted() {
        this.init();
    },
    watch: {
        bookmarks() {
            this.$refs.scrollView.refresh();
        }
    },
    computed: {
        ...mapGetters('bookmark', ['bookmarks']),
        bookmarkLists: {
            get() {
                return this.bookmarks;
            },
            set(value) {
                this.updateBookmarks(value);
            }
        }
    },
    methods: {
        ...mapActions('bookmark', ['fetchBookmarks', 'updateBookmarks']),
        async init() {
            await this.fetchBookmarks();
            this.$refs.scrollView.refresh();
        },
        onLinkTapAction(item) {
            if (!this.edit) {
                this.$emit('tap', item.url);
            }
        },
        toggleEditAction(e) {
            e.preventDefault();
            this.edit = !this.edit;
            if (this.edit) {
                this.$refs.scrollView.iscroll.disable();
            } else {
                this.$refs.scrollView.iscroll.enable();
            }
        },
        onAddAction() {
            this.$emit('add');
        },
        onEditAction(item, inx) {
            if (this.edit) {
                this.$emit('edit', item, inx);
            } else {
                this.$emit('tap', item.url);
            }
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
