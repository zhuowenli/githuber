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

const fetchTrendingRepos = async (lang, since, type = 'repositories') => {
    // 访问页面
    const url = `https://github.com/trending${type === 'developers' ? '/developers/' : '/'}${encodeURIComponent(lang)}`;
    const data = await get(url, { since });

    const $ = cheerio.load(data);
    const repos = [];

    // 解析页面
    $('article.Box-row').each((index, el) => {
        const $el = $(el);

        if (type === 'repositories') {
            const $avatars = $el.find('.avatar');
            const title = $el.find('h1').text().trim().replace(/(\s|\n)+/g, '');
            const [author, repo] = title.split('/');

            const starLink = `/${title}/stargazers`;
            const forkLink = `/${title}/network/members.${repo}`;
            const repoLink = `https://github.com/${title}`;

            const item = {
                author,
                repo: title,
                repo_link: repoLink,
                desc: $el.find('p', '.py-1').text().trim() || null,
                lang: $el.find('[itemprop=programmingLanguage]').text().trim() || 'unknown',
                stars: $el.find(`[href="${starLink}"]`).text().trim() || 0,
                forks: $el.find(`[href="${forkLink}"]`).text().trim() || 0,
                avatars: [],
                added: $el.find('.d-inline-block.float-sm-right').text().trim().replace(/([a-z,\s])/g, '') || 0,
            };

            if ($avatars && $avatars.length) {
                [...$avatars].map($avatar => item.avatars.push($avatar.attribs.src));
            }

            const { result } = findOne(languages, { name: item.lang });
            if (result) item.color = result.color;

            repos.push(item);
        } else {
            const avatar = $el.find('img').attr('src');
            const link = $el.find('h1.h3 a').attr('href');
            const author = $el.find('h1.h3 a').text().replace(/(^(\s|\n)+|(\s|\n)+$)/g, '');
            const $hot = $el.find('div article h1 a');
            const $hotDesc = $el.find('div article h1').next();

            repos.push({
                avatar,
                author,
                link: `https://github.com${link}`,
                username: link.replace(/^\//, ''),
                hot_repo: $hot.text().replace(/(\s|\n)+/g, ''),
                hot_repo_link: `https://github.com${$hot.attr('href')}`,
                hot_repo_desc: $hotDesc.text().replace(/(^(\s|\n)+|(\s|\n)+$)/g, ''),
            });
        }
    });

    if (type === 'developers' && lang === 'JavaScript' && (Math.random() * 2) > 1) {
        repos.push({
            avatar: 'https://avatars3.githubusercontent.com/u/9620783?s=96&v=4',
            author: '卓文理',
            link: 'https://github.com/zhuowenli',
            username: 'zhuowenli',
            hot_repo: 'githuber',
            hot_repo_link: 'https://github.com/zhuowenli/githuber',
            hot_repo_desc: ':octocat: Display Github Trending repositories on Chrome New Tab Extensions',
        });
    }

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
