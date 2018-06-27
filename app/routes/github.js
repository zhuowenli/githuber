/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-05-06 13:21:58
 */

'use strict';


import Router from 'koa-router';
import axios from 'axios';

const router = new Router();
const id = process.env.CLIENT_ID;
const sercet = process.env.CLIENT_SERECT;

router.get('/github/login', async (ctx, next) => {
    // 去到github授权页
    const dataStr = (new Date()).valueOf();
    const path = `https://github.com/login/oauth/authorize?client_id=${id}&scope=['user']&state=${dataStr}`;

    ctx.redirect(path); // 送到授权的中间页
});

// 添加
router.get('/github/callback', async (ctx, next) => {
    const code = ctx.query.code;
    const data = await axios({ // 没有fetch,需要装node-fetch
        url: 'https://github.com/login/oauth/access_token',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            client_id: id,
            client_secret: sercet,
            code
        },
    }).then(res => res.data);

    const args = data.split('&');
    const arg = args[0].split('=');
    const access_token = arg[1];

    const url = `https://api.github.com/user?access_token=${access_token}`; // token就是oauth令牌环

    await axios.get(url)
        .then(res => {
            ctx.body = res.data;
        });
});

export default router;
