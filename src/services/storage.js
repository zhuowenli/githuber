/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-20 19:51:19
 */

'use strict';

export default {
    getItem(key) {
        return new Promise((resolve) => {
            chrome.storage.local.get(key, item => {
                // console.log('getItem', key);
                if (item[key]) {
                    resolve(JSON.parse(item[key]));
                } else {
                    resolve(null);
                }
            });
        });
    },

    setItem(key, val) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({ [key]: JSON.stringify(val) }, e => {
                if (e) {
                    reject(e);
                } else {
                    resolve(val);
                }
            });
        });
    },

    removeItem(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.remove(key, e => {
                if (e) {
                    reject(e);
                } else {
                    resolve(key);
                }
            });
        });
    }
};

