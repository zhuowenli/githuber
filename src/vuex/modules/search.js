/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-18 14:46:48
 */

'use strict';

import { get, jsonp } from '../../services/fetch';
import * as types from '../types';

export const getters = {
    suggestions: state => state.suggestions,
    superpages: state => state.superpages,
    customSearchEngines: state => state.customSearchEngines,
};

export const actions = {
    /**
     * 获取搜索联想
     *
     * @param {any} { commit } state
     * @param {String} wd 关键词
     * @returns {Promise}
     */
    async fetchSuggestion ({ commit }, wd) {
        const data = await jsonp('//suggestion.baidu.com/su', { wd }).then(res => res.s);
        commit(types.RECEIVE_SUGGESTIONS, data);
        return data;
    },

    /**
     * 获取网站联想
     *
     * @param {any} { commit } state
     * @param {any} wd 关键词
     * @returns {Promise}
     */
    async fetchSuperpage({ commit }, wd) {
        let data = await jsonp('//nssug.baidu.com/su', { wd, prod: 'superpage' }).then(res => res.s);

        data = data.map(item => {
            const obj = {};

            try {
                const text = decodeURIComponent(item);
                const array = text.split('0{#S+_}');
                const content = JSON.parse(array[1]);

                obj.name = content[4];
                obj.url = content[1];
            } catch (e) {
                console.log(e);
            }

            return obj;
        }).filter(item => item.name);

        commit(types.RECEIVE_SUPERPAGES, data);
        return data;
    },

    /**
     * 获取自定义搜索引擎
     *
     * @param {any} { commit } state
     * @returns {Promise}
     */
    fetchCustomSearchEngine({ commit }) {
        commit(types.RECEIVE_SEARCH_ENGINES, []);
    }
};

export const mutations = {
    [types.RECEIVE_SUGGESTIONS](state, data) {
        state.suggestions = data;
    },
    [types.RECEIVE_SUPERPAGES](state, data) {
        state.superpages = data;
    },
    [types.RECEIVE_SEARCH_ENGINES](state, data) {
        state.customSearchEngines = data;
    }
};

export default {
    actions,
    getters,
    mutations,
    namespaced: true,
    state: {
        suggestions: [],
        superpages: [],
        customSearchEngines: [
            {
                name: 'GitHub',
                url: 'https://github.com/search?utf8=✓&q=%s'
            },
            {
                name: 'Stack Overflow',
                url: 'http://stackoverflow.com/search?q=%s'
            }
        ],
    },
};
