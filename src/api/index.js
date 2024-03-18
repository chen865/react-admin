// 接口请求模块

import ajax from './ajax';
import qs from 'qs';
import jsonp from 'jsonp';
import { message } from 'antd';

// export function reqLogin(){
//     ajax('/newAdminLogin',{account,password})
// }

const BASE = ''

export const reqLogin = (account, password) => {
    const data = qs.stringify({
        account: account,
        password: password,
    })

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    return ajax(BASE + '/newAdminLogin', data, 'POST', headers);
}

export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=d1c8fe21873308c24f3c0669698a73ae&output=json&city=${city}&extensions=base`;
        jsonp(url, {}, (err, data) => {
            //console.log('高德天气api：', err, data);
            // 处理高德天气api
            if (!err && data.status === '1') {
                const { province, city, weather, reporttime } = data.lives[0];
                //console.log('11111',province, city, weather, reporttime)
                resolve({ province, city, weather, reporttime })
            } else {
                // 失败
                message.error('天气获取失败！ ')
            }
        })
    })
}
//reqWeather('110101')


// 获取商品分类
export const reqCategorys = () => ajax(BASE + "/product/productCategory", {}, 'GET')

// 获取商品子类
export const reqChildCategorys = (id) => ajax(BASE + "/product/subcategory", { id }, 'GET')

// 添加商品分类
export const reqAddCategorys = (name, parentId, classify) => ajax(BASE + "/product/addCategory", { name, parentId, classify }, 'POST')

// 更新分类
export const reqUpdateCategorys = (id, name) => ajax(BASE + "/product/updateCategoryName", { id, name }, 'POST')

// 获取商品分页列表数据
export const reqAllGoods = (page, size, name, type) => ajax(BASE + "/goods/allGoods", { page, size, name, type }, 'GET')

// 修改商品的上架/下架状态
export const reqGoodsStatus = (id, status) => ajax(BASE + "/goods/updateStatus", { id, status }, 'GET')

// 获取商品分类
export const reqCategoryCascade = () => ajax(BASE + "/product/categoryCascade", {}, 'GET')

// 删除上传的图片根据名称
export const reqDeletePicture = (name) => ajax(BASE + "/goods/deletePicture", { name }, 'POST')

// 添加和更新商品，根据id判断
export const reqAddOrUpdateGoods = (goods) => ajax(BASE + "/goods/addOrUpdateGoods", goods, 'POST')