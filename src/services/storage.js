/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-20 19:51:19
 */

'use strict';

export default {
    getItem(key) {
        const item = window.localStorage.getItem(key);

        if (item) {
            return Promise.resolve(JSON.parse(item));
        }

        return Promise.resolve();
    },
    setItem(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val));
        return Promise.resolve();
    },
    removeItem(key) {
        window.localStorage.removeItem(key);
        return Promise.resolve();
    }
};

