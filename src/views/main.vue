<template lang="pug">
    .main
        .main__aside(:class="{show: config.showBookmark}")
            bookmark(
                @tap="onBookmarkTapAction"
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
                    @tap="onLinkTapAction"
                    @update="onConfigUpdateAction"
                )
        .main__setting(:class="{show: config.showSetting}")
            .main__setting-title {{$t('Setting')}}
            el-form.main__setting-content()
                el-form-item(:label="$t('openSearchInNewTab')")
                    el-switch(v-model="config.openSearchInNewTab")
                el-form-item(:label="$t('openLinkInNewTab')")
                    el-switch(v-model="config.openLinkInNewTab")
                el-form-item(:label="$t('openBookmarkInNewTab')")
                    el-switch(v-model="config.openBookmarkInNewTab")
                el-form-item(:label="$t('showBookmark')")
                    el-switch(v-model="config.showBookmark")
                el-form-item(:label="$t('Language')")
                    el-select(v-model="config.locale")
                        el-option(label="中文" value="zh")
                        el-option(label="English" value="en")

        dialog-bookmark-edit(v-model="dialog")
</template>

<script>
import { mapActions } from 'vuex';
import octicons from 'octicons';
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
            octicons,
            config: { ...config, ...cfg },
            dialog: {
                show: false,
                form: {},
            },
        };
    },
    mounted() {
        document.title = this.$t('NewTabs');
    },
    methods: {
        ...mapActions('bookmark', ['removeBookmark']),

        // 搜索事件
        onSearchAction(url) {
            if (this.config.openSearchInNewTab) {
                window.open(url);
            } else {
                window.location.href = url;
            }
        },

        // 点击链接跳转
        onLinkTapAction(url) {
            if (this.config.openLinkInNewTab) {
                window.open(url);
            } else {
                window.location.href = url;
            }
        },

        // 点击书签跳转
        onBookmarkTapAction(url) {
            if (this.config.openBookmarkInNewTab) {
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
            // this.$message({
            //     message: this.$t('DeleteSuccess'),
            //     type: 'success'
            // });
        },

        onLocaleChange() {
            this.$i18n.locale = this.config.locale;
        }
    },
    watch: {
        config: {
            handler() {
                storage.setItem('GITHUBER_CONFIGURATION', this.config);
            },
            deep: true,
        },
        'config.locale': 'onLocaleChange'
    }
};
</script>

<style lang="sass">
    @import './main.sass'
</style>
