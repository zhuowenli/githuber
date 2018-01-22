/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-14 20:40:46
 */

'use strict';

import crypto from 'crypto';

export default function(sequelize, Sequelize) {
    const admin = sequelize.define('admin', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 20],
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '密码',
        },
    }, {
        underscored: true,
        tableName: 'admin',
    });

    function hasSecurePassword(user) {
        const salt = 'abcdefghijklmnopqrstuvwxyz';

        user.password = crypto.pbkdf2Sync(user.password, salt, 4096, 60, 'sha1').toString('base64');

        return sequelize.Promise.resolve(user);
    }

    admin.beforeCreate((user) => {
        if (user.password) {
            return hasSecurePassword(user);
        }
    });

    admin.beforeUpdate((user) => {
        if (user.password) {
            return hasSecurePassword(user);
        }
    });

    return admin;
}

