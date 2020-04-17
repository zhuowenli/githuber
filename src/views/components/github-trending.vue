<template lang="pug">
    iscroll-view.github-trending(
        :scrollerClass="{scroller: true}"
        :options="{mouseWheel: true}"
        ref="scrollView"
    )
        .github-trending__title
            .select
                el-select(v-model="query.since")
                    el-option(:label="$t('Today')" value="daily")
                    el-option(:label="$t('ThisWeek')" value="weekly")
                    el-option(:label="$t('ThisMonth')" value="monthly")

                el-select.language(
                    multiple
                    filterable
                    :multiple-limit="5"
                    v-model="query.lang"
                    :placeholder="$t('AllLanguages')"
                )
                    el-option(
                        v-for="item in languages"
                        :key="item.value"
                        :value="item.value"
                        :label="item.name"
                    )

            el-radio-group(v-model="query.type" size="small")
                el-radio-button(label="repositories") Repositories
                el-radio-button(label="developers") Developers

        .github-trending__loading(ref="loading" v-show="loading")

        .github-trending__error(v-if="fetchError")
            img(src="../../assets/network-error.png", alt="")
            p.title {{$t('NetworkErrorTitle')}}
            p.content {{$t('NetworkErrorContent')}}
            el-button(round type="primary" @click="init") {{$t('Refresh')}}

        .github-trending__content(v-if="!loading && !fetchError")
            .trending(
                v-for="(item, inx) in trendings"
                :key="inx"
            )
                el-card.repositories(
                    v-if="query.type === 'repositories'"
                    @click.native="onLinkTapAction(item.repo_link)"
                )
                    .repositories__title {{item.repo}}
                    .repositories__desc {{item.desc}}
                    .repositories__meta
                        span.color(:style="{background: item.color}")
                        span.lang {{item.lang}}
                        svg.octicon.octicon-star(v-html="octicons.star.path")
                        span.stars {{item.stars}}
                            .added +{{item.added}}
                        svg.octicon.octicon-repo-forked(v-html="octicons['repo-forked'].path")
                        span.forks {{item.forks}}
                    .repositories__built
                        | Built by
                        img(v-for="(avatar, inx) in item.avatars" :key="inx" :src="avatar")

                el-card.developers(v-if="query.type === 'developers'")
                    .developers__author(@click="onLinkTapAction(item.link)")
                        img.avatar(:src="item.avatar")
                        .author
                            h2 {{item.author}}
                            p {{item.username}}

                    .developers__content
                        h3
                            svg.octicon.octicon-repo(v-html="octicons.repo.path")
                            span {{item.hot_repo}}

                        p {{item.hot_repo_desc}}
</template>

<script>
import { Loading } from 'element-ui';
import octicons from 'octicons';
import { mapGetters, mapActions } from 'vuex';
import Waterfall from 'vue-waterfall/lib/waterfall';
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot';
import languages from '../../services/languages';

export default {
    name: 'github-trending',
    components: {
        Waterfall,
        WaterfallSlot
    },
    props: {
        lang: [String, Array],
        since: String,
        type: String,
        showBookmark: Boolean
    },
    data() {
        let lang = [];

        if (typeof this.lang === 'object') {
            lang = this.lang;
        } else if (typeof this.lang === 'string' && this.lang !== 'all') {
            lang = [this.lang];
        }

        return {
            languages,
            octicons,
            fetchError: false,
            loading: false,
            query: {
                lang,
                since: this.since || 'weekly',
                type: this.type || 'repositories',
            }
        };
    },
    async mounted() {
        this.init();
    },
    computed: {
        ...mapGetters('github', ['trendings'])
    },
    methods: {
        ...mapActions('github', ['fetchTrending']),
        async init() {
            const { loading } = this.$refs;
            const loadingInstance = Loading.service({ target: loading });

            this.loading = true;
            this.fetchError = false;

            try {
                this.$emit('update', this.query);
                await this.fetchTrending(this.query);
            } catch (e) {
                console.log(e);
                this.fetchError = true;
            }

            this.loading = false;
            loadingInstance.close();
            this.$refs.scrollView.refresh();
        },
        onLinkTapAction(link) {
            this.$emit('tap', link);
        },
    },
    watch: {
        query: {
            handler: 'init',
            deep: true,
        },
        lang: {
            handler(val) {
                const lang = typeof val === 'string' ? [val] : [];
                this.query.lang = lang.length ? lang : val;
            },
            deep: true
        },
        since(val) {
            this.query.since = val;
        },
        type(val) {
            this.query.type = val;
        },
        // showBookmark: 'onReflowedAction'
    }
};
</script>

<style lang="sass">
    @import './github-trending.sass'
</style>

