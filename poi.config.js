/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-08-22 15:05:24
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: 'src/index.js',
    output: {
        fileNames: {
            js: '[name].js',
            css: '[name].css',
            image: 'static/[path][name].[ext]',
            font: 'static/[path][name].[ext]',
        },
        html: {
            title: 'New Tabs',
            template: 'index.html',
        },
        minimize: !isDev,
        sourceMap: !isDev,
    },
    babel: {
        jsx: 'vue',
    },
    configureWebpack(cfg) {
        cfg.resolve.modules.push(path.resolve('src'));
        cfg.resolve.alias.vue$ = 'vue/dist/vue.js';

        if (!isDev) {
            cfg.devtool = false;
            cfg.bail = true;
        } else {
            cfg.devtool = 'source-map';
        }

        // cfg.plugins.push(new BundleAnalyzerPlugin());

        return cfg;
    },
};

