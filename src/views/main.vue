<template lang="pug">
    .main
        search-box
</template>

<script>
import searchBox from './components/search.vue';

export default {
    name: 'hero',
    components: { searchBox },
    data() {
        return {};
    },
    mounted() {
    },
    methods: {},
};
</script>

<style lang="sass">
    .main
</style>
