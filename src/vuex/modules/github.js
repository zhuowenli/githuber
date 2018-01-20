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

export const getters = {
    trendings: state => state.trendings,
};

export const actions = {
    async fetchTrending ({ commit }, query = {}) {
        const data = await get('https://trendings.herokuapp.com/repo', query).then(res => res.items);

        data.map(item => {
            const { result } = findOne(languages, { name: item.lang });

            if (result) {
                item.color = result.color;
            }

            return item;
        });
        commit(types.FETCH_GITHUB_TRENDINGS, data);

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
