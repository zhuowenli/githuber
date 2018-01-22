/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-15 22:08:06
 */

'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('metadata', {
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
            created_at: {
                type: Sequelize.DATE,
                comment: '创建时间',
            },
            updated_at: {
                type: Sequelize.DATE,
                comment: '更新时间',
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('metadata');
    },
};
