/**
 * Author: 卓文理
 * Created: 2017-09-04 07:52:32
 * Last Modified: 2017-09-04 09:48:16
 * Modified By: 卓文理
 */

const color = require('cli-color');

module.exports = function log(text, theme = 'green') {
    console.log(color[theme](text));
};
