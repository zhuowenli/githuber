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
            return JSON.parse(item);
        }

        return null;
    },
    setItem(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val));
        return key;
    },
    removeItem(key) {
        window.localStorage.removeItem(key);
        return key;
    }
};

