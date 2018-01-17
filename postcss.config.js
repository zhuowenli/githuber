/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-04-28 17:34:06
 */

'use strict';

module.exports = {
    plugins: [
        require('autoprefixer')({
            remove: false,
            browsers: ['iOS >= 7', 'Android >= 4.1'],
        }),
    ],
};

