/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-18 14:54:16
 */

'use strict';


const decode = decodeURIComponent;
const encode = encodeURIComponent;

// Helpers
const isString = o => typeof o === 'string';
const same = s => s;

function parseCookieString(text, shouldDecode) {
    const cookies = {};

    if (isString(text) && text.length > 0) {
        const decodeValue = shouldDecode ? decode : same;
        const cookieParts = text.split(/;\s/g);
        let cookieName;
        let cookieValue;
        let cookieNameValue;

        for (let i = 0, len = cookieParts.length; i < len; i += 1) {
            // Check for normally-formatted cookie (name-value)
            cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
            if (cookieNameValue instanceof Array) {
                try {
                    cookieName = decode(cookieNameValue[1]);
                    cookieValue = decodeValue(cookieParts[i]
                        .substring(cookieNameValue[1].length + 1));
                } catch (ex) {
                    // Intentionally ignore the cookie -
                    // the encoding is wrong
                }
            } else {
                // Means the cookie does not have an "=", so treat it as
                // a boolean flag
                cookieName = decode(cookieParts[i]);
                cookieValue = '';
            }

            if (cookieName) {
                cookies[cookieName] = cookieValue;
            }
        }
    }

    return cookies;
}

function isNonEmptyString(s) {
    return isString(s) && s !== '';
}

function validateCookieName(name) {
    if (!isNonEmptyString(name)) {
        throw new TypeError('Cookie name must be a non-empty string');
    }
}

export default {
    /**
     * 获取 cookie
     * @param {String} cookie 名
     * @param {Function|Object} options Optional
     * @param {Boolean} options.raw 当 raw 为 true 时，cookie的值不会被URI解码
     * @param {Function} options.converter 该函数会在返回值之前执行。如果cookie不存在，则不使用该函数。 可以方便地传递函数而不是选项对象。
     * @return 如果 converter 不存在，则返回一个 string or undefined。
     * 如果获取的 cookie 为空，并且 converter 函数存在，则返回 converter 的返回值。
     */
    get(name, options) {
        validateCookieName(name);

        if (typeof options === 'function') {
            options = { converter: options };
        } else {
            options = options || {};
        }

        const cookies = parseCookieString(document.cookie, !options.raw);
        return (options.converter || same)(cookies[name]);
    },

    /**
     * 保存 cookie
     * @param {string} name 名称
     * @param {*} value 存储内容
     * @param {Object} options Optional
     * @param {Boolean} options.raw 当raw为true时，在设置之前不应该被URI编码。
     * @param {Number|Date} options.expires 到期时间
     * @param {Boolean} options.secure secure
     * @param {String} options.domain 域名
     * @return {string} 创建的cookie字符串。
     */
    set(name, value, options) {
        validateCookieName(name);

        options = options || {};
        const expires = options.expires;
        const domain = options.domain;
        const path = options.path;

        if (!options.raw) {
            value = encode(String(value));
        }

        let text = `${name}=${value}`;

        // expires
        let date = expires;

        //
        if (!date) {
            date = new Date('2021/01/01');
        }

        if (typeof date === 'number') {
            date = new Date();
            date.setDate(date.getDate() + expires);
        }

        if (date instanceof Date) {
            text += `; expires=${date.toUTCString()}`;
        }

        // domain
        if (isNonEmptyString(domain)) {
            text += `; domain=${domain}`;
        }

        // path
        if (isNonEmptyString(path)) {
            text += `; path=${path}`;
        }

        // secure
        if (options.secure) {
            text += '; secure';
        }

        document.cookie = text;
        return text;
    },

    /**
     * 通过将过期日期设置为过去的某个时间，删除一个cookie。
     * @param {string} name 名称
     * @param {Object} options Optional expires 时间将被该方法覆盖。
     * @param {String} options.path path
     * @param {Boolean} options.secure secure
     * @param {String} options.domain 域名
     * @return {string} The created cookie string.
     */
    remove(name, options) {
        options = options || {};
        options.expires = new Date(0);
        return this.set(name, '', options);
    }
};
