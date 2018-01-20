/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-20 14:15:42
 */

'use strict';

import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

// Install the vue plugin
Vue.use(VueApollo);

const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'https://api.github.com/graphql',
});

const cache = new InMemoryCache();

export default new ApolloClient({
    link: httpLink,
    cache,
    ssrForceFetchDelay: 100,
});
