/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-24 17:24:02
 */

'use strict';

import Vue from 'vue';
import VueI18n from 'vue-i18n';

import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
    en: enLocale,
    zh: zhLocale
};

const i18n = new VueI18n({
    locale: 'en',
    messages,
});

export default i18n;
