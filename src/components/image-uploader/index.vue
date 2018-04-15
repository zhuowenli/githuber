<template lang="pug">
    .image-uploader()
        el-upload(
            drag
            action="http://up-z0.qiniu.com/"
            :show-file-list="false"
            :data="qiniu"
            :before-upload="handleBeforeUpload"
            :on-success="handleUploadSuccess"
        )
            img(:src="url + '?imageView2/1/w/178'" v-if="url")
            .el-upload-dragger__interact(
                v-if="url"
                :class="{show: showInteract}"
                @mouseenter="showInteract = true"
                @mouseleave="showInteract = false"
            )
                span.btn
                    i.el-icon-upload2
                    span {{$t('KeepUpload')}}
                span.btn(@click.stop="handleUploadRemove")
                    i.el-icon-delete
                    span {{$t('Delete')}}
            .el-upload-dragger__inner(v-else)
                i.el-icon-upload
                .el-dragger__text(v-html="$t('UploadNote')")
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

<style lang="scss">
    @import './index.scss';
</style>
