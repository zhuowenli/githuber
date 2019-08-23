<template lang="pug">
    .main
        .main-aside(
            :class="{'main-aside--show': config.showBookmark, 'main-aside--collapse': config.collapseBookmark}"
        )
            bookmark(
                :collapseBookmark="config.collapseBookmark"
                @tap="onBookmarkTapAction"
                @add="onBookmarkAddAction"
                @edit="onBookmarkEditAction"
                @remove="onBookmarkRemoveAction"
            )

        .main-content
            .main__header(:class="config.engineName")
                search-box(
                    :engineName="config.engineName"
                    :engineNavName="config.engineNavName"
                    @search="onSearchAction"
                    @update="onConfigUpdateAction"
                )
                .search-border
                button.btn-setting(@click="onToggleSettingAction")
                    svg.octicon.oction-x(v-html="octicons.x.path" v-if="config.showSetting")
                    svg.octicon.oction-gear(v-html="octicons.gear.path" v-else)

            .main__trending
                github-trending(
                    :lang="config.lang"
                    :since="config.since"
                    :showBookmark="config.showBookmark"
                    @tap="onLinkTapAction"
                    @update="onConfigUpdateAction"
                )

        main-setting(v-model="config" @upload="onUploadAction" @import="onImportBookmarks")
        dialog-bookmark-edit(v-model="dialog")
</template>

<script>
import { mapActions } from 'vuex';
import octicons from 'octicons';
import Promise from 'bluebird';
import searchBox from './components/search.vue';
import githubTrending from './components/github-trending.vue';
import bookmark from './components/bookmark.vue';
import dialogBookmarkEdit from './components/dialog-bookmark-edit.vue';
import mainSetting from './components/setting.vue';
import storage from '../services/storage';
import defaultConfig from '../services/config';
import themeBlack from '../theme/black';
import themeDefault from '../theme/default';

export default {
    name: 'hero',
    components: { searchBox, githubTrending, bookmark, mainSetting, dialogBookmarkEdit },
    data() {
        const cfg = storage.getItem('GITHUBER_CONFIGURATION');
        return {
            octicons,
            config: { ...defaultConfig, ...cfg },
            dialog: {
                show: false,
                form: {},
            },
        };
    },
    mounted() {
        document.title = this.$t('NewTabs');
        this.onThemeChange();
    },
    methods: {
        ...mapActions('bookmark', ['removeBookmark', 'restoreBackupBookmarks', 'saveBookmark']),

        // 搜索事件
        onSearchAction(url) {
            if (this.config.openSearchInNewTab) {
                chrome.tabs.create({ url });
            } else {
                chrome.tabs.update({ url });
            }
        },

        // 点击链接跳转
        onLinkTapAction(url) {
            if (this.config.openLinkInNewTab) {
                chrome.tabs.create({ url });
            } else {
                chrome.tabs.update({ url });
            }
        },

        // 点击书签跳转
        onBookmarkTapAction(url) {
            if (this.config.openBookmarkInNewTab) {
                chrome.tabs.create({ url });
            } else {
                chrome.tabs.update({ url });
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

        // 编辑书签
        onBookmarkEditAction(item, index) {
            this.dialog = {
                index,
                show: true,
                edit: true,
                form: {
                    name: item.name || '',
                    url: item.url || '',
                    logo: item.logo || '',
                },
            };
        },

        // 删除书签
        async onBookmarkRemoveAction(item) {
            await this.removeBookmark(item);
        },

        // 导入书签
        onImportBookmarks(sites) {
            Promise.map(sites, item => {
                this.saveBookmark({ form: {
                    name: item.title,
                    url: item.url,
                    logo: `chrome://favicon/64@2x/${item.url}`,
                } });
            }).then(() => {
                console.log(111);
            });
            console.log(sites);
        },

        onLocaleChange() {
            this.$i18n.locale = this.config.locale;
        },

        // 导入配置
        onUploadAction({ config, bookmarks }) {
            Object.assign(this.config, config);
            this.restoreBackupBookmarks(bookmarks);
            this.$message({
                message: this.$t('RestoreBackupSuccess'),
                type: 'success'
            });
        },

        onThemeChange() {
            const theme = this.config.nightMode ? themeBlack : themeDefault;
            Object.keys(theme).forEach((key) => {
                document.body.style.setProperty(key, theme[key]);
            });
        }
    },
    watch: {
        config: {
            handler() {
                storage.setItem('GITHUBER_CONFIGURATION', this.config);
            },
            deep: true,
        },
        'config.locale': 'onLocaleChange',
        'config.nightMode': 'onThemeChange'
    }
};
</script>

<style lang="sass">
    @import './main.sass';
</style>
