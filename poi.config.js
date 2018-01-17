/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-08-22 15:05:24
 */

'use strict';

const path = require('path');

module.exports = (options, req) => ({
    entry: 'src/index.js',
    host: '0.0.0.0',
    filename: {
        js: '[name].js',
        css: '[name].css',
        static: 'static/[name]-[hash].[ext]'
    },
    html: {
        title: 'Githuber',
        template: 'index.html'
    },
    resolve: true,
    sourceMap: !!options.dev,
    extendWebpack(cfg) {
        // Disable progress bar while building
        // cfg.plugins.delete('progress-bar');
        cfg.module.rule('scss')
            .use('sass-loader')
            .tap(opt => {
                opt.includePaths = [path.resolve(__dirname, './node_modules')];
                return opt;
            });
    },
    webpack(cfg) {
        cfg.resolve.modules.push(path.resolve('src'));
        cfg.resolve.alias.vue$ = 'vue/dist/vue.js';

        if (!options.dev) {
            cfg.devtool = false;
            cfg.bail = true;
        } else {
            cfg.devtool = 'source-map';
        }

        return cfg;
    },
    vendor: options.mode === 'test' ? false : Object.keys(require('./package.json').dependencies)
});

