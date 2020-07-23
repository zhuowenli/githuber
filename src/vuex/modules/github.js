/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-18 10:53:12
 */

'use strict';

import { get } from '../../services/fetch';
import * as types from '../types';
import storage from '../../services/storage';

const time = new Date();
const year = new Date(time.getFullYear(), 0, 1);
const toDay = time.getDate();
const toWeek = Math.ceil((((new Date() - year) / 86400000) + year.getDay() + 1) / 7);
const toMonth = time.getMonth() + 1;

const fetchTrendingRepos = async (lang, since, type = 'repositories') => {
    const data = await get(`https://ghapi.huchen.dev/${type}?language=${lang}&since=${since}`);

    if (type === 'developers' && lang === 'JavaScript' && (Math.random() * 2) > 1) {
        data.push({
            avatar: 'https://avatars3.githubusercontent.com/u/9620783?s=96&v=4',
            author: '卓文理',
            url: 'https://github.com/zhuowenli',
            username: 'zhuowenli',
            repo: {
                name: 'githuber',
                url: 'https://github.com/zhuowenli/githuber',
                description: ':octocat: Display Github Trending repositories on Chrome New Tab Extensions',
            }
        });
    }

    return data;
};

export const getters = {
    trendings: state => state.trendings,
};

export const actions = {
    /**
     * 获取GitHub Trending
     *
     * @param {any} { commit } state
     * @param {Object} [query={}] 请求参数
     * @param {String} query.since 时间维度：daily、weekly、monthly
     * @param {String} query.lang 语言
     * @param {String} query.type repositories、developers
     * @returns {Promise}
     */
    async fetchTrending ({ commit }, query = {}) {
        const data = await storage.getItem(JSON.stringify(query));

        if (
            data && data.repos.length && (
                (query.since === 'daily' && data.toDay === toDay) ||
                (query.since === 'weekly' && data.toWeek === toWeek) ||
                (query.since === 'monthly' && data.toMonth === toMonth)
            )
        ) {
            commit(types.RECEIVE_GITHUB_TRENDINGS, data.repos);
            return data.repos;
        }

        const { since, type } = query;

        let repos = [];
        let isAllLanguage = false;

        if (query.lang.length) {
            query.lang.map(item => {
                if (item === '') isAllLanguage = true;
                return item;
            });
        }

        if (!query.lang.length || isAllLanguage) {
            repos = await fetchTrendingRepos('', since, type);
        } else {
            await Promise.map(query.lang, async lang => {
                const res = await fetchTrendingRepos(lang, since, type);
                repos = repos.concat(res);
                return res;
            });
            repos = repos.sort((a, b) => (+b.added - a.added));
        }

        commit(types.RECEIVE_GITHUB_TRENDINGS, repos);

        storage.setItem(JSON.stringify(query), {
            repos,
            toDay,
            toWeek,
            toMonth
        });

        return repos;
    },

};

export const mutations = {
    [types.RECEIVE_GITHUB_TRENDINGS](state, data) {
        state.trendings = data;
    },
};

export default {
    actions,
    getters,
    mutations,
    namespaced: true,
    state: {
        trendings: [],
    },
};
