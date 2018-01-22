<template lang="pug">
    el-dialog(:title="i18n.Add" :visible.sync="dialog.show")
        el-form(:model="dialog.form" label-width="40px")
            el-form-item(label="名称")
                el-input(v-model="dialog.form.name")
            el-form-item(label="网址")
                el-input(v-model="dialog.form.url")
            el-form-item(label="头像")
                image-uploader(v-model="dialog.form.logo")
        .dialog-footer(slot="footer")
            el-button(@click="dialog.show = false") 取消
            el-button(type="primary" @click="onBookmarkSaveAction") 保存
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import i18n from '../../services/i18n';
import imageUploader from '../../components/image-uploader';

export default {
    name: 'dialog-bookmark-edit',
    components: { imageUploader },
    props: {
        value: Object
    },
    data() {
        return {
            i18n,
            dialog: this.value
        };
    },
    computed: {
        ...mapGetters('bookmark', ['bookmarks'])
    },
    methods: {
        ...mapActions('bookmark', ['fetchBookmarks', 'saveBookmark']),
        onBookmarkSaveAction() {
            this.saveBookmark(this.dialog.form);
            this.dialog.show = false;
        },
    },
    watch: {
        value: {
            handler() {
                this.dialog = this.value;
            },
            deep: true,
        },
        dialog: {
            handler() {
                this.$emit('input', this.dialog);
            },
            deep: true,
        },
    }
};
</script>

