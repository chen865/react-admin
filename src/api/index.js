// 接口请求模块

import ajax from './ajax'
import qs from 'qs';

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

