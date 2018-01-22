/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-17 18:03:38
 */

'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import { post } from '../services/fetch';

import search from './modules/search';
import github from './modules/github';
import bookmark from './modules/bookmark';

Vue.use(Vuex);

export const actions = {
    async fetchQiniuToken(store, key) {
        return post('http://githuber.zhuowenli.com/api/token/qiniu', { key });
    }
};
export const getters = {};
export const mutations = {};
export default new Vuex.Store({
    state: {},
    actions,
    mutations,
    modules: {
        search,
        github,
        bookmark,
    },
    strict: process.env.NODE_ENV !== 'production'
});
