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

        el-dialog(title="添加" :visible.sync="dialog.show")
            el-form(:model="dialog.form")
                el-form-item(label="名称")
                    el-input(v-model="dialog.form.name")
                el-form-item(label="网址")
                    el-input(v-model="dialog.form.url")
                el-form-item(label="头像")
                    el-upload.avatar-uploader(
                        action="https://i.screenshot.net/api/upload"
                        :data="upload"
                        :show-file-list="false"
                        :on-success="onUploadSuccess"
                        :before-upload="onBeforeUploadAction"
                    )
                        <img v-if="dialog.form.logo" :src="dialog.form.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import i18n from '../../services/i18n';

export default {
    name: 'bookmark',
    data() {
        return {
            dialog: {
                show: false,
                form: {},
            },
            upload: {}
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
            this.dialog = {
                show: true,
                form: {
                    name: '',
                    url: '',
                    logo: ''
                },
            };
        },
        onUploadSuccess(res, { response }) {
            const link = response.link.replace('screenshot.net', 'i.screenshot.net');

            this.dialog.form.logo = link;
        },
        onBeforeUploadAction(file) {
            this.upload = {
                filename: file.name,
                app_lang: 'en',
                title: '',
                password: '',
            };
            return this.upload;
        }
    }
};
</script>

<style lang="sass">
    @import './bookmark.sass'
</style>
