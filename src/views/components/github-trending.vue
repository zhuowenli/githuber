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
                el-option(label="daily" value="daily")
                el-option(label="weekly" value="weekly")
                el-option(label="monthly" value="monthly")
            el-select(v-model="query.lang" filterable)
                el-option(value="" label="All Languages")
                el-option(
                    v-for="item in languages"
                    :key="item.value"
                    :value="item.value"
                    :label="item.name"
                )

        .github-trending__content(v-loading="loading")
            waterfall(
                :line-gap="340"
                :max-line-gap="360"
                :min-line-gap="300"
                :single-max-width="400"
                :watch="trendings"
                ref="waterfall"
                @reflowed="onReflowedAction"
            )
                waterfall-slot(
                    v-for="item in trendings"
                    :key="item.repo"
                    :width="340"
                    :height="240"
                )
                    el-card.trending(@click.native="onLinkTapAction(item)")
                        .trending__title {{item.repo}}
                        .trending__desc {{item.desc}}
                        .trending__meta
                            span.color(:style="{background: item.color}")
                            span.lang {{item.lang}}
                            span.stars {{item.stars}}
                            span.forks {{item.forks}}
                        .trending__built
                            | Built by
                            img(v-for="(avatar, inx) in item.avatars" :key="inx" :src="avatar")
</template>

<script>
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
        lang: String,
        since: String,
    },
    data() {
        return {
            languages,
            loading: false,
            query: {
                lang: this.lang || '',
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
            this.loading = true;
            await this.fetchTrending(this.query);
            this.$emit('update', this.query);
            this.loading = false;
        },
        onReflowedAction() {
            this.$refs.scrollView.refresh();
        },
        onLinkTapAction(item) {
            this.$emit('tap', item.repo_link);
        }
    },
    watch: {
        query: {
            handler: 'init',
            deep: true,
        },
        lang(val) {
            this.query.lang = val;
        },
        since(val) {
            this.query.since = val;
        },
    }
};
</script>

<style lang="sass">
    @import './github-trending.sass'
</style>

