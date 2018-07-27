/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-20 20:59:49
 */

'use strict';

import * as types from '../types';
import findOne from '../../services/findOne';
import storage from '../../services/storage';

export const getters = {
    bookmarks: state => state.bookmarks,
};

export const actions = {
    async fetchBookmarks ({ commit }) {
        let data = storage.getItem('GITHUBER_BOOKMARKS') || [];

        if (!data.length) {
            /* eslint-disable max-len */
            data = [
                {
                    name: 'zhuowenli/githuber: 这是一个帮助 Githuber 每日发现优质内容的 Chrome 主页拓展。',
                    logo: 'https://assets-cdn.github.com/favicon.ico',
                    url: 'https://github.com/zhuowenli/githuber'
                }, {
                    name: 'zhuowenli - GitHub',
                    url: 'https://github.com/zhuowenli',
                    logo: 'http://zhuowenli.qiniudn.com/2018/1/22/1516614358916991.png'
                }, {
                    name: 'Dribbble - Show and tell for designers',
                    url: 'https://dribbble.com/',
                    logo: 'https://cdn.dribbble.com/assets/dribbble-ball-192-ec064e49e6f63d9a5fa911518781bee0c90688d052a038f8876ef0824f65eaf2.png'
                }, {
                    name: 'Codrops - 右键点击列表进入编辑模式',
                    url: 'https://tympanus.net/codrops/'
                }, {
                    name: '编辑模式下双击可编辑、拖拽可排序',
                    logo: 'https://www.google.com/images/branding/product/ico/googleg_lodp.ico',
                    url: 'https://www.google.com/'
                },
            ];

            storage.setItem('GITHUBER_BOOKMARKS', data);
        }

        commit(types.RECEIVE_BOOKMARKS, data);
        return data;
    },
    async updateBookmarks ({ commit }, data) {
        commit(types.RECEIVE_BOOKMARKS, data);
        return data;
    },
    async saveBookmark ({ commit }, { form: item, index }) {
        commit(types.SAVE_BOOKMARKS, { item, index });
        return item;
    },
    async removeBookmark({ commit }, item) {
        commit(types.DELETE_BOOKMARKS, item);
    },
    async restoreBackupBookmarks({ commit }, data) {
        commit(types.RESTORE_BACKUP_BOOKMARKS, data);
    }
};

export const mutations = {
    [types.RECEIVE_BOOKMARKS](state, data) {
        state.bookmarks = data;
        storage.setItem('GITHUBER_BOOKMARKS', state.bookmarks);
    },
    [types.RESTORE_BACKUP_BOOKMARKS](state, data) {
        data.map(item => {
            const { index } = findOne(state.bookmarks, { name: item.name });
            if (index === -1) {
                state.bookmarks.push(item);
            }
            return item;
        });

        storage.setItem('GITHUBER_BOOKMARKS', state.bookmarks);
    },
    [types.SAVE_BOOKMARKS](state, { item, index }) {
        if (index || index === 0) {
            state.bookmarks.splice(index, 1, item);
        } else {
            state.bookmarks.unshift(item);
        }
        storage.setItem('GITHUBER_BOOKMARKS', state.bookmarks);
    },
    [types.DELETE_BOOKMARKS](state, item) {
        const index = state.bookmarks.indexOf(item);

        if (index >= 0) {
            state.bookmarks.splice(index, 1);
            storage.setItem('GITHUBER_BOOKMARKS', state.bookmarks);
        }
    },
};

export default {
    actions,
    getters,
    mutations,
    namespaced: true,
    state: {
        bookmarks: [],
    },
};
