<template lang="pug">
    .main
        .main__aside(:class="{show: config.showBookmark}")
            bookmark(
                @tap="onlinkTapAction"
                @add="onBookmarkAddAction"
                @remove="onBookmarkRemoveAction"
            )
        .main__content
            .main__header
                search-box(
                    :engineName="config.engineName"
                    :engineNavName="config.engineNavName"
                    @search="onSearchAction"
                    @update="onConfigUpdateAction"
                )
                .search-border(:class="config.engineName")
                button.btn-setting(@click="onToggleSettingAction")
                    svg.octicon.oction-x(v-html="octicons.x.path" v-if="config.showSetting")
                    svg.octicon.oction-kebab-vertical(v-html="octicons['kebab-vertical'].path" v-else)
            .main__trending
                github-trending(
                    :lang="config.lang"
                    :since="config.since"
                    :showBookmark="config.showBookmark"
                    @tap="onlinkTapAction"
                    @update="onConfigUpdateAction"
                )
        .main__setting(:class="{show: config.showSetting}")
            .main__setting-title 设置
            el-form.main__setting-content()
                el-form-item(:label="i18n.openSearchInNewTap")
                    el-switch(v-model="config.openSearchInNewTap")
                el-form-item(:label="i18n.openLinkInNewTap")
                    el-switch(v-model="config.openLinkInNewTap")
                el-form-item(:label="i18n.openBookmarkInNewTap")
                    el-switch(v-model="config.openBookmarkInNewTap")
                el-form-item(:label="i18n.showBookmark")
                    el-switch(v-model="config.showBookmark")

        dialog-bookmark-edit(v-model="dialog")
</template>

<script>
import { mapActions } from 'vuex';
import octicons from 'octicons';
import i18n from '../services/i18n';
import searchBox from './components/search.vue';
import githubTrending from './components/github-trending.vue';
import bookmark from './components/bookmark.vue';
import dialogBookmarkEdit from './components/dialog-bookmark-edit.vue';
import storage from '../services/storage';
import config from '../services/config';

export default {
    name: 'hero',
    components: { searchBox, githubTrending, bookmark, dialogBookmarkEdit },
    data() {
        const cfg = storage.getItem('GITHUBER_CONFIGURATION');
        return {
            i18n,
            octicons,
            config: { ...config, ...cfg },
            dialog: {
                show: false,
                form: {},
            },
        };
    },
    mounted() {
    },
    methods: {
        ...mapActions('bookmark', ['removeBookmark']),

        // 搜索事件
        onSearchAction(url) {
            if (this.config.openSearchInNewTap) {
                window.open(url);
            } else {
                window.location.href = url;
            }
        },

        // 点击链接跳转
        onlinkTapAction(url) {
            if (this.config.openLinkInNewTap) {
                window.open(url);
            } else {
                window.location.href = url;
            }
        },

        // 显示设置面板
        onToggleSettingAction() {
            this.config.showSetting = !this.config.showSetting;
        },

        // 更新配置
        async onConfigUpdateAction(item) {
            Object.assign(this.config, item);
        },

        // 添加书签
        onBookmarkAddAction() {
            this.dialog = {
                show: true,
                form: {
                    name: '',
                    url: '',
                    logo: ''
                },
            };
        },

        // 删除书签
        async onBookmarkRemoveAction(item) {
            await this.removeBookmark(item);
            this.$message({
                message: this.i18n.DeleteSuccess,
                type: 'success'
            });
        },
    },
    watch: {
        config: {
            handler() {
                storage.setItem('GITHUBER_CONFIGURATION', this.config);
            },
            deep: true,
        }
    }
};
</script>

<style lang="sass">
    @import './main.sass'
</style>
