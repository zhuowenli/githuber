<template lang="pug">
    iscroll-view.github-trending(
        :scrollerClass="{scroller: true}"
        :options="{mouseWheel: true, scrollbars: true}"
        ref="scrollView"
    )
        .github-trending__title
            //- h1 Trending
            //- p See what the GitHub community is most excited about today.

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

        .github-trending__loading(ref="loading" v-show="loading")

        .github-trending__error(v-if="fetchError")
            img(src="../../assets/network-error.png", alt="")
            p.title {{$t('NetworkErrorTitle')}}
            p.content {{$t('NetworkErrorContent')}}
            button.button(@click="init") {{$t('Refresh')}}

        .github-trending__content(v-if="!loading && !fetchError")
            .trending(
                v-for="(item, inx) in trendings"
                :key="inx"
            )
                el-card(@click.native="onLinkTapAction(item)")
                    .trending__title {{item.repo}}
                    .trending__desc {{item.desc}}
                    .trending__meta
                        span.color(:style="{background: item.color}")
                        span.lang {{item.lang}}
                        svg.octicon.octicon-star(v-html="octicons.star.path")
                        span.stars {{item.stars}}
                        svg.octicon.octicon-repo-forked(v-html="octicons['repo-forked'].path")
                        span.forks {{item.forks}}
                        //- .trending__added +{{item.added}}
                    .trending__built
                        | Built by
                        img(v-for="(avatar, inx) in item.avatars" :key="inx" :src="avatar")
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
                since: this.since || 'weekly'
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
                await this.fetchTrending(this.query);
                this.$emit('update', this.query);
            } catch (e) {
                this.fetchError = true;
            }

            this.loading = false;
            loadingInstance.close();
            this.$refs.scrollView.refresh();
        },
        onLinkTapAction(item) {
            this.$emit('tap', item.repo_link);
        },
        onAllLangAction() {
            console.log(111);
        }
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
        // showBookmark: 'onReflowedAction'
    }
};
</script>

<style lang="sass">
    @import './github-trending.sass'
</style>

