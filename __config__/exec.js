/**
 * Author: 卓文理
 * Created: 2017-09-04 09:38:50
 * Last Modified: 2017-09-04 09:39:23
 * Modified By: 卓文理
 */

const exec = require('child_process').exec;

module.exports = (cmd, callback, ops) => {
    ops = ops || {};

    return new Promise((resolve, reject) => {
        exec(cmd, ops, (err, stdout, stderr) => {
            if (err) {
                const errMsgs = [
                    '!!-- Exec Error --!!',
                    `Cmd: [${cmd}]`,
                    `Error: ${err}`,
                    `Stderr: ${stderr}`,
                    `Stdout: ${stdout}`,
                    '!!-- Exec Error End --!!'
                ];

                return reject(errMsgs.join('\n'));
            }

            resolve(String(stdout));
        });
    });
};
