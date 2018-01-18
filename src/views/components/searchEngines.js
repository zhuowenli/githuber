/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-18 20:31:28
 */

'use strict';

import i18n from '../../services/i18n';

export default [
    {
        name: i18n.Baidu,
        value: 'baidu',
        engines: [
            {
                type: i18n.Web,
                url: 'https://www.baidu.com/s?isource=infinity&wd='
            }, {
                type: i18n.Images,
                url: 'https://image.baidu.com/search/index?tn=baiduimage&word='
            }, {
                type: i18n.News,
                url: 'http://news.baidu.com/ns?tn=news&ie=utf-8&word='
            }, {
                type: i18n.Musics,
                url: 'http://music.baidu.com/search?ie=utf-8&key='
            }, {
                type: i18n.Videos,
                url: 'http://video.baidu.com/v?ie=utf-8&word='
            }, {
                type: i18n.Maps,
                url: 'http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D'
            }
        ]
    },
    {
        name: 'Google',
        value: 'google',
        engines: [
            {
                type: i18n.Web,
                url: 'https://www.google.com/search?q='
            }, {
                type: i18n.Images,
                url: 'https://www.google.com/search?tbm=isch&q='
            }, {
                type: i18n.News,
                url: 'https://www.google.com/search?tbm=nws&q='
            }, {
                type: i18n.Videos,
                url: 'https://www.google.com/search?tbm=vid&q='
            }, {
                type: i18n.Maps,
                url: 'https://www.google.com/maps/preview?q='
            }
        ]
    },
    {
        name: 'Yahoo',
        value: 'yahoo',
        engines: [
            {
                type: i18n.Web,
                url: 'https://search.yahoo.com/search?fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8&p='
            }, {
                type: i18n.Images,
                url: 'https://images.search.yahoo.com/search/images?p='
            }, {
                type: i18n.News,
                url: 'https://news.search.yahoo.com/search?p='
            }, {
                type: i18n.Videos,
                url: 'https://video.search.yahoo.com/search/video?p='
            }, {
                type: i18n.Sports,
                url: 'https://sports.search.yahoo.com/search?p='
            }
        ]
    },
    {
        name: 'Bing',
        value: 'bing',
        engines: [
            {
                type: i18n.Web,
                url: 'https://www.bing.com/search?isource=infinity&iname=bing&itype=web&q='
            }, {
                type: i18n.Images,
                url: 'https://www.bing.com/images/search?isource=infinity&iname=bing&q='
            }, {
                type: i18n.News,
                url: 'https://www.bing.com/news/search?isource=infinity&iname=bing&q='
            }, {
                type: i18n.Videos,
                url: 'https://www.bing.com/videos/search?isource=infinity&iname=bing&q='
            }, {
                type: i18n.Maps,
                url: 'http://www.bing.com/maps/default.aspx?q='
            }
        ]
    }
];
