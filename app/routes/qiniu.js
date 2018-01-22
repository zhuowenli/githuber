/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-12-17 14:28:20
 */

'use strict';

import moment from 'moment';
import Router from 'koa-router';
import qiniu from 'qiniu';

const router = new Router();

router.post('/token/qiniu', async (ctx) => {
    const data = ctx.request.body || {};
    const bucket = process.env.QINIU_BUCKET;
    const accessKey = process.env.QINIU_ACCESS_KEY;
    const secretKey = process.env.QINIU_SECRET_KEY;

    let uploadKey = data.key;
    if (!uploadKey) {
        const momentDate = moment();
        uploadKey = `tmp/${momentDate.format('YYYYMMDD')}/${Math.random(5).toString().slice(2, 12)}`;
    }
    const putPolicy = new qiniu.rs.PutPolicy({
        scope: `${bucket}:${uploadKey}`,
    });
    putPolicy.returnBody = '{"bucket":$(bucket),"key":$(key),"width":$(imageInfo.width),"height":$(imageInfo.height),"avinfo":$(avinfo)}';

    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const token = putPolicy.uploadToken(mac);
    const fileUrl = `${process.env.QINIU_HOST}/${uploadKey}`;

    ctx.body = {
        token,
        key: uploadKey,
        url: fileUrl
    };
});

export default router;
