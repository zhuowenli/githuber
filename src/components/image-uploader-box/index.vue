<template lang="pug">
    .my-image-box-uploader()
        el-upload(
            show-file-list
            list-type="picture-card"
            action="//up-z0.qiniu.com/"
            :data="qiniu"
            :file-list="images"
            :before-upload="handleBeforeUpload"
            :on-success="handleUploadSuccess"
            :on-preview="handleUploadPreview"
            :on-remove="handleUploadRemove"
        )
            i.el-icon-plus

        el-dialog(:visible.sync="dialogVisible" size="tiny")
            img(width="100%" :src="dialogImageUrl")
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'image-uploader-box',
    props: {
        value: Array
    },
    data() {
        const images = [];

        this.value.map(img => {
            img.name = img.url;
            images.push(img);
            return img;
        });

        return {
            images,
            upload: {},
            qiniu: {},
            dialogVisible: false,
            dialogImageUrl: '',
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
            this.images.push(upload);
            file.url = this.upload.url;

            return file;
        },
        handleUploadPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleUploadRemove(file) {
            const index = this.images.indexOf(file);
            this.images.splice(index, 1);
        }
    },
    watch: {
        value(val) {
            this.images = val;
            this.images.map(img => {
                img.name = img.url;
                return img;
            });
        },
        images(val) {
            this.$emit('input', val);
            this.$emit('change', val);
        }
    }
};
</script>

<style lang="scss">
    .my-image-box-uploader{
        .el-upload{
            &-list{
                &__item{
                    width: 100px;
                    height: 100px;
                }
            }
            &--picture-card{
                width: 100px;
                height: 100px;
                line-height: 100px;
            }
        }
    }
</style>
