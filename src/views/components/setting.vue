<template lang="pug">
    .setting(:class="{show: config.showSetting}")
        .setting-title {{$t('Setting')}}
        iscroll-view.setting-content(
            :scrollerClass="{scroller: true}"
            :options="{mouseWheel: true, scrollbars: true}"
            ref="scrollView"
        )
            el-card
                div(slot="header") {{$t('GoalOpeningMethod')}}
                el-form
                    el-form-item(:label="$t('openSearchInNewTab')")
                        el-switch(v-model="config.openSearchInNewTab")
                    el-form-item(:label="$t('openLinkInNewTab')")
                        el-switch(v-model="config.openLinkInNewTab")
                    el-form-item(:label="$t('openBookmarkInNewTab')")
                        el-switch(v-model="config.openBookmarkInNewTab")
                .el-card__tips {{$t('GoalOpeningMethodNote')}}

            el-card
                div(slot="header") {{$t('View')}}
                el-form
                    el-form-item(:label="$t('Language')")
                        el-select(v-model="config.locale" size="medium")
                            el-option(label="中文" value="zh")
                            el-option(label="English" value="en")
                    el-form-item(:label="$t('showBookmark')")
                        el-switch(v-model="config.showBookmark")
                    el-form-item(:label="$t('collapseBookmark')")
                        el-switch(v-model="config.collapseBookmark")
                    el-form-item(:label="$t('Theme')")
                        el-switch(v-model="config.nightMode")

                    el-form-item(:label="$t('importTopSites')")
                        el-button(type="info" size="medium" round @click="onImportTopSites") {{$t('import')}}


            el-card
                div(slot="header") {{$t('DataBackup')}}
                .el-card__upload
                    el-button(type="info" size="medium" round @click="onExportAction") {{$t('DataBackup')}}
                    .upload
                        input(
                            ref="file"
                            type="file"
                            accept=".githuber"
                            @change="onImportAction"
                        )
                        el-button(type="success" size="medium" round) {{$t('RestoreBackup')}}

            el-card
                div(slot="header") {{$t('About')}}
                a.link(href="https://github.com/zhuowenli/" target="_blank") {{$t('AboutAuthor')}}
                a.link(href="https://github.com/zhuowenli/githuber/issues" target="_blank") {{$t('Feedback')}}
                a.link(href="https://github.com/zhuowenli/githuber" target="_blank") {{$t('SourceCode')}}
                .version v{{manifest.version}}
</template>

<script>
import fileSaver from 'file-saver';
import storage from '../../services/storage';
import manifest from '../../../static/manifest.json';

export default {
    name: 'setting',
    props: {
        value: Object,
    },
    data() {
        return {
            manifest,
            config: this.value || {},
        };
    },
    methods: {
        // 导出配置
        onExportAction() {
            const config = storage.getItem('GITHUBER_CONFIGURATION');
            const bookmarks = storage.getItem('GITHUBER_BOOKMARKS') || [];
            const data = JSON.stringify({ config, bookmarks });

            const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
            fileSaver.saveAs(blob, 'Backup.githuber', true);
        },

        // 导入配置
        onImportAction() {
            const file = this.$refs.file.files[0];
            const reader = new FileReader();

            reader.onload = (evt) => {
                const { result } = evt.target;
                try {
                    const data = JSON.parse(result);
                    this.$emit('upload', data);
                } catch (e) {
                    this.$notify.error({
                        title: '解析失败',
                        message: '备份文件解析失败，请确认所选择的文件是否正常！'
                    });
                }
            };
            reader.readAsText(file);
        },

        onImportTopSites() {
            chrome.topSites.get(sites => {
                this.$emit('import', sites);
            });
        }
    },
    watch: {
        value() {
            this.config = this.value;
        },
        config() {
            this.$emit('input', this.config);
        }
    }
};
</script>

<style lang="sass">
    @import './setting.sass'
</style>
