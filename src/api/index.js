// 接口请求模块

import ajax from './ajax';
import qs from 'qs';
import jsonp from 'jsonp';
import { message } from 'antd';

// export function reqLogin(){
//     ajax('/newAdminLogin',{account,password})
// }

const BASE = ''

export const reqLogin = (account,password) =>{
    const data =qs.stringify({
        account: account,
        password: password,
    })

    const headers = {
        'content-type': 'application/x-www-form-urlencoded' 
    };

   return ajax(BASE + '/newAdminLogin',data,'POST',headers);
}

export const reqWeather = (city) => {

    return new Promise((resolve,reject) =>{
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

