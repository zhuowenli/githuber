/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-15 22:10:38
 */

'use strict';

export default function(sequelize, Sequelize) {
    const metadata = sequelize.define('metadata', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'key',
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
            comment: '内容',
        },
    }, {
        underscored: true,
        tableName: 'metadata',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return metadata;
}
