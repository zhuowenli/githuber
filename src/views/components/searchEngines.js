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
                name: i18n.Web,
                value: 'Web',
                url: 'https://www.baidu.com/s?isource=infinity&wd='
            }, {
                name: i18n.Images,
                value: 'Images',
                url: 'https://image.baidu.com/search/index?tn=baiduimage&word='
            }, {
                name: i18n.News,
                value: 'News',
                url: 'http://news.baidu.com/ns?tn=news&ie=utf-8&word='
            }, {
                name: i18n.Musics,
                value: 'Musics',
                url: 'http://music.baidu.com/search?ie=utf-8&key='
            }, {
                name: i18n.Videos,
                value: 'Videos',
                url: 'http://video.baidu.com/v?ie=utf-8&word='
            }, {
                name: i18n.Maps,
                value: 'Maps',
                url: 'http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D'
            }
        ]
    },
    {
        name: 'Google',
        value: 'google',
        engines: [
            {
                name: i18n.Web,
                value: 'Web',
                url: 'https://www.google.com/search?q='
            }, {
                name: i18n.Images,
                value: 'Images',
                url: 'https://www.google.com/search?tbm=isch&q='
            }, {
                name: i18n.News,
                value: 'News',
                url: 'https://www.google.com/search?tbm=nws&q='
            }, {
                name: i18n.Videos,
                value: 'Videos',
                url: 'https://www.google.com/search?tbm=vid&q='
            }, {
                name: i18n.Maps,
                value: 'Maps',
                url: 'https://www.google.com/maps/preview?q='
            }
        ]
    },
    {
        name: 'Yahoo',
        value: 'yahoo',
        engines: [
            {
                name: i18n.Web,
                value: 'Web',
                url: 'https://search.yahoo.com/search?fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8&p='
            }, {
                name: i18n.Images,
                value: 'Images',
                url: 'https://images.search.yahoo.com/search/images?p='
            }, {
                name: i18n.News,
                value: 'News',
                url: 'https://news.search.yahoo.com/search?p='
            }, {
                name: i18n.Videos,
                value: 'Videos',
                url: 'https://video.search.yahoo.com/search/video?p='
            }, {
                name: i18n.Sports,
                value: 'Sports',
                url: 'https://sports.search.yahoo.com/search?p='
            }
        ]
    },
    {
        name: 'Bing',
        value: 'bing',
        engines: [
            {
                name: i18n.Web,
                value: 'Web',
                url: 'https://www.bing.com/search?isource=infinity&iname=bing&itype=web&q='
            }, {
                name: i18n.Images,
                value: 'Images',
                url: 'https://www.bing.com/images/search?isource=infinity&iname=bing&q='
            }, {
                name: i18n.News,
                value: 'News',
                url: 'https://www.bing.com/news/search?isource=infinity&iname=bing&q='
            }, {
                name: i18n.Videos,
                value: 'Videos',
                url: 'https://www.bing.com/videos/search?isource=infinity&iname=bing&q='
            }, {
                name: i18n.Maps,
                value: 'Maps',
                url: 'http://www.bing.com/maps/default.aspx?q='
            }
        ]
    }
];
