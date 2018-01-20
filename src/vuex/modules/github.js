/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-18 10:53:12
 */

'use strict';

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

console.log(toDay, toWeek, toMonth);
export const getters = {
    trendings: state => state.trendings,
};

export const actions = {
    async fetchTrending ({ commit }, query = {}) {
        const { since } = query;
        let data = await storage.getItem(JSON.stringify(query));

        if (data && (since === data.since)) {
            commit(types.FETCH_GITHUB_TRENDINGS, data.data);
            return data.data;
        }

        data = await get('https://trendings.herokuapp.com/repo', query).then(res => res.items);

        data.map(item => {
            const { result } = findOne(languages, { name: item.lang });
            if (result) item.color = result.color;
            return item;
        });

        commit(types.FETCH_GITHUB_TRENDINGS, data);
        storage.setItem(JSON.stringify(query), { data, since });

        return data;
    },

};

export const mutations = {
    [types.FETCH_GITHUB_TRENDINGS](state, data) {
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
