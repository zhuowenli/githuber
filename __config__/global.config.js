/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-12-17 14:39:21
 */

'use strict';

const baseConfig = {
    currentIP: require('ip').address(),
    appPort: 9001,
    webpackDevServerPort: 4000,
};

module.exports = Object.assign(baseConfig, {
    appServerPath: ['http://', baseConfig.currentIP, ':', baseConfig.appPort].join(''),
    webpackServerPath: ['http://', baseConfig.currentIP, ':', baseConfig.webpackDevServerPort].join('')
});

