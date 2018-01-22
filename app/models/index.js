/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-12-17 16:16:03
 */

'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config/database';

const basename = path.basename(module.filename);
const db = {};

let sequelize = null;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
