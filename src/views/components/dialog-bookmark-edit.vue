<template lang="pug">
    el-dialog(:title="$t(dialog.edit ? 'Edit' : 'Add')" :visible.sync="dialog.show")
        el-form(:model="dialog.form" label-width="60px")
            el-form-item(:label="$t('Name')")
                el-input(v-model="dialog.form.name")
            el-form-item(:label="$t('Url')")
                el-input(v-model="dialog.form.url")
            el-form-item(:label="$t('Logo')")
                el-input(v-model="dialog.form.logo" placeholder="https?://xxx.png")
                image-uploader(v-model="dialog.form.logo")
        .dialog-footer(slot="footer")
            el-button(@click="dialog.show = false") {{$t('Cancel')}}
            el-button(type="primary" @click="onBookmarkSaveAction") {{$t('Save')}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import imageUploader from '../../components/image-uploader';

export default {
    name: 'dialog-bookmark-edit',
    components: { imageUploader },
    props: {
        value: Object
    },
    data() {
        return {
            dialog: this.value
        };
    },
    computed: {
        ...mapGetters('bookmark', ['bookmarks'])
    },
    methods: {
        ...mapActions('bookmark', ['fetchBookmarks', 'saveBookmark']),
        onBookmarkSaveAction() {
            this.saveBookmark(this.dialog);
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

<style lang="sass" scoped>
    .image-uploader
        margin-top: 5px
</style>
