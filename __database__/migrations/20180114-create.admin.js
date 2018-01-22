/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-14 20:20:19
 */

'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('admin', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: '名称',
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: '密码',
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
        return queryInterface.dropTable('admin');
    },
};
