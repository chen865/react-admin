/*
用来发送ajax请求的js
*/
import { message } from 'antd';
import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {

  // if (type === 'GET') {
  //     return axios.get(url, {params: data})
  //       // .then(function (response) {
  //       //   console.log('模版里响应成功：',response);
  //       // })
  //       // .catch(function (error) {
  //       //   console.log('模版里响应失败：',error);
  //       // })
  //       // .then(function () {
  //       //   // 总是会执行
  //       // });  
  // } else {
  //     return axios.post(url, data)
  //       // .then(function (response) {
  //       //   console.log('模版里响应成功：',response);
  //       // })
  //       // .catch(function (error) {
  //       //   console.log('模版里响应失败：',error);
  //       // });
  // }

  // 修改 统一处理
  return new Promise((resolve, reject) => {
    let promise;
    if (type === 'GET') {
      promise = data ? axios.get(url, {
        params: data
      }) : axios.get(url)

    } else {
      promise = axios.post(url,data)

    }
    promise.then(function (response) {
      resolve(response)
      //console.log('模版里响应成功：', response);
      // if(response.data.code === 999){
      //   message.error('请求出错了,'+ response.data.msg)
      // }
    }).catch(function (error) {
      //console.log('模版里响应失败：', error);
      message.error('请求出错了', error.message)
    });

  })

}

//ajax('/newAdminLogin',{account:'lcy',password:'xxxxx'},'POST').then()