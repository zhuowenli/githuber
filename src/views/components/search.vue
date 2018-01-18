<template lang="pug">
    .search
        el-tabs
            el-tab-pane(
                v-for="item in searchEngine.engines"
                :label="item.type"
                :name="item.type"
                :key="item.type"
            )

        el-autocomplete(
            v-model="search"
            :fetch-suggestions="querySearch"
            @select="onSearchAction"
            :placeholder="searchEngine.name"
        )
            el-dropdown(slot="prefix" trigger="click" placement="top-start" @command="onCommandAction")
                i(class="el-input__icon el-icon-search")
                el-dropdown-menu(slot="dropdown")
                    el-dropdown-item(v-for="item in searchEngines" :key="item.valuw" :command="item") {{item.name}}

            .suggestion(slot-scope="props")
                .suggestion__search(v-if="props.item.search") {{props.item.name}}
                .suggestion__url(v-else-if="props.item.url") {{props.item.name}}
                .suggestion__word(v-else) {{props.item.name}}

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import searchEngines from './searchEngines';

export default {
    name: 'search-box',
    data() {
        return {
            searchEngines,
            engine: 'google',
            search: '',

        };
    },
    computed: {
        ...mapGetters('search', ['suggestions', 'superpages']),
        searchEngine() {
            return this.searchEngines.find(item => (item.value === this.engine));
        },
    },
    mounted() {
    },
    methods: {
        ...mapActions('search', ['fetchSuggestion', 'fetchSuperpage']),
        async querySearch(str, cb) {
            const result = [];

            if (str) {
                await this.fetchSuperpage(str);
                await this.fetchSuggestion(str);

                this.suggestions.map(name => result.push({ name }));

                if (this.superpages.length) {
                    result.unshift(this.superpages[0]);
                }
                result.unshift({ name: '搜索自 GitHub', search: 'https://github.com/search?utf8=✓&q=' });
                result.unshift({ name: '搜索自 Stack Overflow', search: 'http://stackoverflow.com/search?q=' });
            }

            cb(result);
        },
        onSearchAction(item) {
            console.log(item);
        },
        onCommandAction(item) {
            this.engine = item.value;
        }
    }
};
</script>

<style lang="sass">
    @import '../../stylesheet/common.sass'

    .search
        max-width: 560px
        width: 100%
        margin: 0 auto
        padding: 50px 0
        .el-autocomplete
            display: block
            width: 100%

    .el-autocomplete-suggestion
        cursor: pointer
        li
            padding: 0
            &:hover
                background: transparent

        .suggestion
            & > div
                padding: 5px 20px
            &__search
                color: $orange
                &:hover
                    background: $orange
                    color: #ffffff
            &__url
                color: $blue
                &:hover
                    background: $blue
                    color: #ffffff
            &__word
                color: $green
                &:hover
                    background: $green
                    color: #ffffff

        .highlighted .suggestion
            &__search
                background: $orange
                color: #ffffff
            &__url
                background: $blue
                color: #ffffff
            &__word
                background: $green
                color: #ffffff
</style>
