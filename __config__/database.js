/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-12-17 14:57:42
 */

'use strict';

const path = require('path');
const loadEnv = require('node-env-file');

loadEnv(path.resolve(__dirname, '../.env'), { raise: false });

module.exports = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    seederStorage: 'sequelize',
    pool: {
        max: 10,
        min: 5,
        idle: 30000,
    },
    // 修复中国时区问题
    timezone: '+08:00',
};
