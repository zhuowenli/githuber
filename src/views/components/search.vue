<template lang="pug">
    .search
        el-form(@submit.prevent.native="onSearchAction")
            el-tabs(v-model="activeEngineNavName" @tab-click="onSearchNameTapAction")
                el-tab-pane(
                    v-for="item in searchEngine.engines"
                    :label="item.name"
                    :name="item.value"
                    :key="item.name"
                )
            el-autocomplete(
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

                el-button(slot="append" icon="el-icon-search" @click="onSearchAction")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import searchEngines from './searchEngines';
import i18n from '../../services/i18n';

export default {
    name: 'search-box',
    props: {
        engineName: String,
        engineNavName: String,
    },
    data() {
        return {
            searchEngines,
            searchText: '',
            activeEngineName: this.engineName || 'google',
            activeEngineNavName: this.engineNavName || 'Web',
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
                if (/%s/.test(search)) {
                    return this.$emit('search', search.replace('%s', this.searchText));
                }

                return this.$emit('search', search + this.searchText);
            }

            if (url) {
                return this.$emit('search', url);
            }

            if (name) {
                this.searchText = name;
            }

            return this.$emit('search', `${this.searchEngineNav.url}${this.searchText}`);
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
    },
    watch: {
        activeEngineName(val) {
            this.$emit('update', { engineName: val });
        },
        activeEngineNavName(val) {
            this.$emit('update', { engineNavName: val });
        },
        engineName(val) {
            this.activeEngineName = val;
        },
        engineNavName(val) {
            this.activeEngineNavName = val;
        },
    }
};
</script>

<style lang="sass">
    @import './search.sass'
</style>
