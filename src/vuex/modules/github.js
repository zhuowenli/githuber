/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-18 10:53:12
 */

'use strict';

import cheerio from 'cheerio';
import Promise from 'bluebird';
import { get } from '../../services/fetch';
import * as types from '../types';
import languages from '../../services/languages';
import findOne from '../../services/findOne';
import storage from '../../services/storage';

const time = new Date();
const year = new Date(time.getFullYear(), 0, 1);
const toDay = time.getDate();
const toWeek = Math.ceil((((new Date() - year) / 86400000) + year.getDay() + 1) / 7);
const toMonth = time.getMonth() + 1;

const fetchTrendingRepos = async (lang, since) => {
    // 访问页面
    const data = await get(`https://github.com/trending/${encodeURIComponent(lang)}`, { since });

    const $ = cheerio.load(data);
    const repos = [];

    // 解析页面
    $('article').each((index, repo) => {
        const $repo = $(repo);
        const $avatars = $repo.find('.avatar');
        const title = $repo.find('h1').text().trim().replace(/ /g, '');

        const starLink = `/${title}/stargazers`;
        const forkLink = `/${title}/network/members`;
        const repoLink = `https://github.com/${title}`;

        const item = {
            author: title.split('/')[0],
            repo: title,
            repo_link: repoLink,
            desc: $repo.find('p', '.py-1').text().trim() || null,
            lang: $repo.find('[itemprop=programmingLanguage]').text().trim() || 'unknown',
            stars: $repo.find(`[href="${starLink}"]`).text().trim() || 0,
            forks: $repo.find(`[href="${forkLink}"]`).text().trim() || 0,
            avatars: [],
            added: $repo.find('.d-inline-block.float-sm-right').text().trim().replace(/([a-z,\s])/g, '') || 0,
        };

        if ($avatars && $avatars.length) {
            [...$avatars].map($avatar => item.avatars.push($avatar.attribs.src));
        }

        const { result } = findOne(languages, { name: item.lang });
        if (result) item.color = result.color;

        repos.push(item);
    });

    return repos;
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

        const { since } = query;

        let repos = [];
        let isAllLanguage = false;

        if (query.lang.length) {
            query.lang.map(item => {
                if (item === '') isAllLanguage = true;
                return item;
            });
        }

        if (!query.lang.length || isAllLanguage) {
            repos = await fetchTrendingRepos('', since);
        } else {
            await Promise.map(query.lang, async lang => {
                const res = await fetchTrendingRepos(lang, since);
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
