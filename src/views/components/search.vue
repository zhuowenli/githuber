<template lang="pug">
    el-form.search(@submit.prevent.native="onSearchAction")
        el-tabs(v-model="activeEngineNavName" @tab-click="onSearchNameTapAction")
            el-tab-pane(
                v-for="item in searchEngine.engines"
                :label="item.name"
                :name="item.value"
                :key="item.name"
            )

        el-autocomplete(
            autofocus
            clearable
            :fetch-suggestions="onQuerySearchAction"
            :placeholder="searchEngine.name"
            :trigger-on-focus="false"
            v-model="searchText"
            @select="onSearchAction"
        )
            el-dropdown(
                slot="prefix"
                trigger="click"
                placement="top-start"
                @command="onEngineChangeAction"
            )
                i.icon-search(:class="`icon-search--${activeEngineName}`")
                el-dropdown-menu(slot="dropdown")
                    el-dropdown-item(
                        v-for="item in searchEngines"
                        :key="item.valuw"
                        :command="item"
                    ) {{item.name}}

            .suggestion(slot-scope="props")
                .suggestion__search(v-if="props.item.search") {{props.item.name}}
                .suggestion__url(v-else-if="props.item.url") {{props.item.name}}
                .suggestion__word(v-else) {{props.item.name}}

            el-button(slot="append" icon="el-icon-search")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import searchEngines from './searchEngines';
import i18n from '../../services/i18n';

export default {
    name: 'search-box',
    data() {
        return {
            searchEngines,
            searchText: '',
            activeEngineName: 'google',
            activeEngineNavName: 'Web',
        };
    },
    computed: {
        ...mapGetters('search', ['suggestions', 'superpages', 'customSearchEngines']),
        // 搜索引擎
        searchEngine() {
            return this.searchEngines.find(item => (item.value === this.activeEngineName));
        },
        // 搜索导航
        searchEngineNav() {
            return this.searchEngine.engines.find(item => (item.value === this.activeEngineNavName));
        },
    },
    mounted() {
        this.fetchCustomSearchEngine();
    },
    methods: {
        ...mapActions('search', ['fetchSuggestion', 'fetchSuperpage', 'fetchCustomSearchEngine']),

        /**
         * 搜索联想
         * @param {String} str 搜索内容
         * @param {Function} cb 回调
         */
        async onQuerySearchAction(str, cb) {
            const result = [];

            if (str) {
                await this.fetchSuperpage(str);
                await this.fetchSuggestion(str);

                this.suggestions.map(name => result.push({ name }));

                if (this.superpages.length) {
                    result.unshift({
                        ...this.superpages[0],
                        value: str
                    });
                }

                this.customSearchEngines.map(item => result.unshift({
                    name: `${i18n.SearchFrom} ${item.name}`,
                    search: item.url,
                    value: str
                }));
            }

            cb(result);
        },

        /**
         * 请求搜索事件
         *
         * @param {Object} item 搜索事件
         * @param {String} item.search 自定义搜索类型
         * @param {String} item.url 搜索联想链接
         * @param {String} item.value 默认搜索值
         * @param {String} item.name 搜索联想内容
         */
        onSearchAction({ search, name, url, value }) {
            if (value) {
                this.searchText = value;
            }

            if (search) {
                window.location.href = search.replace('%s', this.searchText);
                return search;
            }

            if (url) {
                window.location.href = url;
                return url;
            }

            if (name) {
                this.searchText = name;
            }

            window.location.href = `${this.searchEngineNav.url}${this.searchText}`;
            return true;
        },

        /**
         * 切换搜索引擎
         *
         * @param {Object} item
         * @param {Object} item.value 搜索引擎
         */
        onEngineChangeAction(item) {
            this.activeEngineName = item.value;
            this.activeEngineNavName = 'Web';
        },

        /**
         * 切换搜索引擎导航
         *
         * @param {Object} item
         * @param {Object} item.name 导航类型
         */
        onSearchNameTapAction({ name }) {
            this.activeEngineNavName = name;
        },
    }
};
</script>

<style lang="sass">
    @import '../../stylesheet/common.sass'

    .search
        max-width: 560px
        width: 100%
        margin: 0 auto
        .el-autocomplete
            display: block
            width: 100%

        .el-input--prefix .el-input__inner
            padding-left: 40px
        .el-input__prefix
            left: 0
        .icon-search
            display: inline-block
            width: 40px
            height: 40px
            outline: 0
            cursor: pointer
            @each $icon in google, baidu, bing, yahoo
                &--#{$icon}
                    background: url('../../assets/search-#{$icon}.png') center center no-repeat;
                    background-size: 30px 30px

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
