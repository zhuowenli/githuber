/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-18 20:31:28
 */

'use strict';

export default [
    {
        name: 'Baidu',
        value: 'baidu',
        engines: [
            {
                name: 'Web',
                value: 'Web',
                url: 'https://www.baidu.com/s?isource=infinity&wd='
            }, {
                name: 'Images',
                value: 'Images',
                url: 'https://image.baidu.com/search/index?tn=baiduimage&word='
            }, {
                name: 'News',
                value: 'News',
                url: 'http://news.baidu.com/ns?tn=news&ie=utf-8&word='
            }, {
                name: 'Musics',
                value: 'Musics',
                url: 'http://music.baidu.com/search?ie=utf-8&key='
            }, {
                name: 'Videos',
                value: 'Videos',
                url: 'http://video.baidu.com/v?ie=utf-8&word='
            }, {
                name: 'Maps',
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
                name: 'Web',
                value: 'Web',
                url: 'https://www.google.com/search?q='
            }, {
                name: 'Images',
                value: 'Images',
                url: 'https://www.google.com/search?tbm=isch&q='
            }, {
                name: 'News',
                value: 'News',
                url: 'https://www.google.com/search?tbm=nws&q='
            }, {
                name: 'Videos',
                value: 'Videos',
                url: 'https://www.google.com/search?tbm=vid&q='
            }, {
                name: 'Maps',
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
                name: 'Web',
                value: 'Web',
                url: 'https://search.yahoo.com/search?fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8&p='
            }, {
                name: 'Images',
                value: 'Images',
                url: 'https://images.search.yahoo.com/search/images?p='
            }, {
                name: 'News',
                value: 'News',
                url: 'https://news.search.yahoo.com/search?p='
            }, {
                name: 'Videos',
                value: 'Videos',
                url: 'https://video.search.yahoo.com/search/video?p='
            }, {
                name: 'Sports',
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
                name: 'Web',
                value: 'Web',
                url: 'https://www.bing.com/search?isource=infinity&iname=bing&itype=web&q='
            }, {
                name: 'Images',
                value: 'Images',
                url: 'https://www.bing.com/images/search?isource=infinity&iname=bing&q='
            }, {
                name: 'News',
                value: 'News',
                url: 'https://www.bing.com/news/search?isource=infinity&iname=bing&q='
            }, {
                name: 'Videos',
                value: 'Videos',
                url: 'https://www.bing.com/videos/search?isource=infinity&iname=bing&q='
            }, {
                name: 'Maps',
                value: 'Maps',
                url: 'http://www.bing.com/maps/default.aspx?q='
            }
        ]
    },
    {
        name: 'DogeDoge',
        value: 'dogedoge',
        engines: [
            {
                name: 'Web',
                value: 'Web',
                url: 'https://www.dogedoge.com/results?q='
            }
        ]
    },
    {
        name: 'DuckDuckGo',
        value: 'duckduckgo',
        engines: [
            {
                name: 'Web',
                value: 'Web',
                url: 'https://duckduckgo.com/?ia=web&q='
            }, {
                name: 'Images',
                value: 'Images',
                url: 'https://duckduckgo.com/?ia=images&iax=images&q='
            }, {
                name: 'News',
                value: 'News',
                url: 'https://duckduckgo.com/?ia=news&iar=news&q='
            }, {
                name: 'Videos',
                value: 'Videos',
                url: 'https://duckduckgo.com/?ia=videos&iax=videos&q='
            }, {
                name: 'Maps',
                value: 'Maps',
                url: 'https://duckduckgo.com/?iaxm=maps&ia=web&q='
            }
        ]
    }
];
