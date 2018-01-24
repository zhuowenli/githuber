/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-18 10:53:12
 */

'use strict';

import cheerio from 'cheerio';
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

export const getters = {
    trendings: state => state.trendings,
};

export const actions = {
    async fetchTrending ({ commit }, query = {}) {
        const { since, lang } = query;
        let data = await storage.getItem(JSON.stringify(query));

        data = await get(`https://github.com/trending/${lang}`, { since });

        const $ = cheerio.load(data);
        const repos = [];

        // 解析页面
        $('li', 'ol.repo-list').each((index, repo) => {
            const $repo = $(repo);
            const $avatars = $repo.find('.avatar');
            const title = $repo.find('h3').text().trim().replace(/ /g, '');

            const starLink = `/${title}/stargazers`;
            const forkLink = `/${title}/network`;
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
                added_stars: '',
            };

            if ($avatars && $avatars.length) {
                [...$avatars].map($avatar => item.avatars.push($avatar.attribs.src));
            }

            const { result } = findOne(languages, { name: item.lang });
            if (result) item.color = result.color;

            repos.push(item);
        });

        commit(types.RECEIVE_GITHUB_TRENDINGS, repos);

        storage.setItem(JSON.stringify(query), {
            data,
            toDay,
            toWeek,
            toMonth
        });

        return data;
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
