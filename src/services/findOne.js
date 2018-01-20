/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-09-21 11:25:45
 */

'use strict';

/**
 * 根据内容查询数组
 *
 * @export
 * @param {Array} arrs 数组
 * @param {any} where 查询内容
 * @returns {Object} result, index
 */
export default function findOne(arrs, where) {
    if (!Array.isArray(arrs) || !arrs.length) return {};

    if (typeof where === 'object' && !Array.isArray(where) && Object.keys(where).length) {
        const keys = Object.keys(where);
        let result = null;
        let index = -1;

        arrs.map((arr, inx) => {
            let flag = true;

            keys.map(key => {
                if (arr[key] !== where[key]) flag = false;
                return key;
            });

            if (flag) {
                result = arr;
                index = inx;
            }

            return arr;
        });

        return { result, index };
    }

    const index = arrs.indexOf(where);

    if (index > 1) {
        return { result: where, index };
    }

    return {};
}

// test
// const data = [
//     {
//         id: 1,
//         name: '张三'
//     },
//     {
//         id: 2,
//         name: '李四'
//     },
// ];

// console.log(findOne(data, { id: 1 }));
// console.log(findOne(data, { name: '李四' }));
