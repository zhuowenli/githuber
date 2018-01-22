<template lang="pug">
    .my-image-uploader()
        el-upload(
            drag
            action="//up-z2.qiniu.com/"
            :show-file-list="false"
            :data="qiniu"
            :before-upload="handleBeforeUpload"
            :on-success="handleUploadSuccess"
        )
            img(:src="url + '?imageView2/1/w/358/h/178'" v-if="url")
            .el-upload-dragger__interact(
                v-if="url"
                :class="{show: showInteract}"
                @mouseenter="showInteract = true"
                @mouseleave="showInteract = false"
            )
                span.btn
                    i.el-icon-upload2
                    span 继续上传
                a.btn(@click.stop="handleUploadPreview" target="_blank" :href="url")
                    i.el-icon-view
                    span 查看图片
                span.btn(@click.stop="handleUploadRemove")
                    i.el-icon-delete
                    span 删除
            .el-upload-dragger__inner(v-else)
                i.el-icon-upload
                .el-dragger__text
                    | 将文件拖到此处，或
                    em 点击上传
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'image-uploader',
    componentName: 'image-uploader',
    props: {
        value: [String]
    },
    data() {
        return {
            upload: this.value.length ? this.value[0] : {},
            qiniu: {},
            url: this.value || '',
            showInteract: false,
        };
    },
    methods: {
        ...mapActions(['fetchQiniuToken']),
        handleBeforeUpload() {
            const now = new Date();
            const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
            const random = parseInt(Math.random() * 1000, 10);
            const key = [date, '/', now.getTime(), random, '.png'].join('');
            this.qiniu = {};
            this.upload = {};

            return this.fetchQiniuToken(key).then((data) => {
                this.qiniu.token = data.token;
                this.qiniu.key = key;
                this.upload.url = data.url;

                return this.qiniu;
            });
        },
        handleUploadSuccess(file) {
            const { upload } = this;

            upload.width = file.width;
            upload.height = file.height;
            upload.type = 0;

            this.upload = upload;

            file.url = this.upload.url;
            this.url = this.upload.url;

            return file;
        },
        handleUploadPreview() {},
        handleUploadRemove() {
            this.url = '';
            this.upload = {};
        }
    },
    watch: {
        value(val) {
            this.url = val;
            this.upload = val.length ? val[0] : {};
        },
        url(val) {
            this.$emit('input', val);
            this.$emit('change', val);
        }
    }
};
</script>

<style lang="scss" scoped>
    @import './index.scss';
</style>
