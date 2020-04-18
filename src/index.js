/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-17 15:44:45
 */
import Vue from 'vue';
import IScrollView from 'vue-iscroll-view';
import IScroll from 'iscroll';
import {
    Upload, Select, Option, RadioGroup, RadioButton, Button,
    Card, Dialog, Form, FormItem, Input, Switch, Tabs, TabPane,
    Dropdown, DropdownItem, DropdownMenu, Autocomplete, Tooltip
} from 'element-ui';

import storage from './services/storage';
import store from './vuex';
import './stylesheet/index.sass';
import main from './views/main.vue';
import i18n from './lang';

Vue.use(IScrollView, IScroll);

[
    Upload, Select, Option, RadioGroup, RadioButton, Button,
    Card, Dialog, Form, FormItem, Input, Switch, Tabs, TabPane,
    Dropdown, DropdownItem, DropdownMenu, Autocomplete, Tooltip
].forEach(component => {
    Vue.component(component.name, component);
});

(async () => {
    const config = await storage.getItem('GITHUBER_CONFIGURATION');

    if (config && config.locale) {
        i18n.locale = config.locale;
    }

    const app = new Vue({
        i18n,
        store,
        render: c => c(main)
    }).$mount('#app');

    if (chrome && chrome.runtime) {
        // 添加书签
        const { id } = chrome.runtime;

        if (id) {
            chrome.runtime.onMessage.addListener((request) => {
                const { name, message } = request;

                if (name === 'add' && message.id === id) {
                    store.dispatch('bookmark/fetchBookmarks');
                }
            });
        }
    }

    window.app = app;
})();
