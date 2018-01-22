/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-15 22:11:45
 */

'use strict';

// import Promise from 'bluebird';
import Router from 'koa-router';
import models from '../models';

const router = new Router();

router.get('/metadata/:name', async (ctx, next) => {
    const { name } = ctx.params;

    if (!name) {
        ctx.status = 401;
        ctx.body = {
            message: '请输入正确的name字段'
        };
        return false;
    }

    const item = await models.metadata.findOne({
        where: { name }
    });

    if (!item) {
        ctx.body = {
            name,
            content: ''
        };
        return false;
    }

    ctx.body = item;

    return true;
});

// 添加
router.post('/metadata/:name', async (ctx, next) => {
    const { name } = ctx.params;
    const data = ctx.request.body;

    let item = await models.metadata.findOne({
        where: { name },
    });

    if (item) {
        await item.update(data);
    } else {
        item = await models.metadata.create({
            name,
            ...data
        });
    }

    ctx.body = item;
});

export default router;
