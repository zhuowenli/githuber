/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-12-14 21:01:19
 */

'use strict';

import debug from 'debug';
import Koa from 'koa';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import koaSession from 'koa-session';
import routes from './routes';
import globalConfig from '../__config__/global.config';

const app = new Koa();
const log = debug('app:log');
// const warn = debug('app:warn');
const error = debug('app:error');

// trust proxy
app.proxy = true;
app.keys = ['d0n7', '7311', '4ny0n3'];

app.use(bodyParser());
app.use(convert(logger()));

// 外层处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.stack;
        ctx.app.emit('error', err, ctx);
    }
});

app.use(koaSession({
    key: 'koa:sess',
    maxAge: 7200000,
    overwrite: true,
    httpOnly: true,
    signed: true,
}, app));

// 路由配置
app.use(routes());

app.on('error', (err) => {
    error('server error: %s', err.stack);
});

const appUrl = ['http://', globalConfig.currentIP, ':', globalConfig.appPort].join('');
app.listen(globalConfig.appPort);
log(`App is now listening on ${appUrl}`);

process.on('SIGINT', () => {
    process.exit();
});

export default app;
