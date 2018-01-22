/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-14 21:09:44
 */

'use strict';

import crypto from 'crypto';
import Router from 'koa-router';
import models from '../models';

const router = new Router();

router.post('/login', async (ctx, next) => {
    const salt = 'abcdefghijklmnopqrstuvwxyz';
    const { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.status = 401;
        ctx.body = {
            message: '请输入账号密码！'
        };
        ctx.session.user = null;
        return false;
    }

    const item = await models.admin.findOne({
        where: { name: username }
    });

    const digest = crypto.pbkdf2Sync(password, salt, 4096, 60, 'sha1').toString('base64');

    if (!item || item.password !== digest) {
        ctx.status = 401;
        ctx.body = {
            message: '账号密码有误！'
        };
        ctx.session.user = null;
        return false;
    }

    ctx.session.user = username;
    ctx.body = item;

    return true;
});

export default router;
