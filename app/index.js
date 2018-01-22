/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-12-14 21:01:55
 */

'use strict';

const path = require('path');
const loadEnv = require('node-env-file');

loadEnv(path.resolve(__dirname, '../.env'), { raise: false });

require('babel-polyfill');
require('babel-register');
require('./app');
