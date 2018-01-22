/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-12-17 13:21:43
 */

'use strict';

import Router from 'koa-router';
import compose from 'koa-compose';
import qiniuToken from './qiniu';
import admin from './admin';
import login from './login';
import metadata from './metadata';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'hello world!';
});

router.use('/api', qiniuToken.routes(), qiniuToken.allowedMethods());
router.use('/api', admin.routes(), admin.allowedMethods());
router.use('/api', login.routes(), login.allowedMethods());
router.use('/api', metadata.routes(), metadata.allowedMethods());

export default function routes() {
    return compose([
        router.routes(),
        router.allowedMethods()
    ]);
}
