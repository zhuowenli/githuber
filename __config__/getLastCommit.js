/**
 * Author: 卓文理
 * Created: 2017-09-04 07:52:14
 * Last Modified: 2017-09-04 09:47:47
 * Modified By: 卓文理
 */

const exec = require('./exec');

module.exports = () => exec('git log -10 --stat --no-merges --pretty=oneline');
