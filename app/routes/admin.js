/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-14 20:45:39
 */

'use strict';

import Router from 'koa-router';
import models from '../models';

const router = new Router();

router.post('/admin', async (ctx, next) => {
    const data = ctx.request.body;
    const item = await models.admin.create({ ...data });
    ctx.body = item;
});

export default router;

