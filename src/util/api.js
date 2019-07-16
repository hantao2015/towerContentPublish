import http from 'lz-request/lib/http';
import {getItem} from './util';
// http.setDefaultBaseURL('http://kingofdinner.realsun.me:9010/');
http.setDefaultBaseURL('https://tower.realsun.me/');


// 请求拦截
http.setRequestInterceptors(
  function(config) {
    // 请求头加上 token
    
    console.log("userInfo")
    const userInfo = JSON.parse(getItem('userInfo'));
    console.log("userInfo",userInfo)
    let token = userInfo && userInfo.AccessToken;
    let userCode = userInfo && userInfo.UserCode;
    if (token && userCode) {
      if ((config.url !== '/rsauth/SendValidMsg'))
      {
        config.headers.accessToken = token;    
        config.headers.userCode = userCode;
      }
    }
    return config;
  },
  function(error) {
    return error;
  }
);

// 响应拦截
http.setResponseInterceptors(
  function(response) {
    const res = response.data;
    if (
      (res &&
        (res.error === 0 ||
          res.error === '0' ||
          res.Error === 0 ||
          res.Error === '0' ||
          res.OpResult === 'Y')) ||
      res === 'ok'
    ) {
      return res;
    } else {
      throw new Error(res.ErrMsg || res.message || res.ErrorMsg);
    }
  },
  function(error) {
    return error;
  }
);



// http.setResponseInterceptors(function(res) {
//   const data = res.data;
//   if (data.OpResult === "Y" || data.Error == 0 || data.error == 0) {
//     return data;
//   } else {
//     throw new Error(data.ErrorMsg);
//   }
// });

/**
 * 通过 unionid 登录
 * 参数：{ unionid, loginMethod = 'weixin' }
 * 1. unionid：unionid
 * 2. loginMethod：登录方式，固定为 'weixin'
 */
http.createApi('loginByUnionid', {
  method: 'post',
  baseURL: 'https://finisar.realsun.me:9092/',
  url: '/api/Account/Login'
});


/**
 * 根据身份证查询记录
 * 参数：{ unionid, loginMethod = 'weixin' }
 */
http.createApi('select', {
  method: 'get',
  baseURL: 'https://finisar.realsun.me:9092/',
  url: '/api/200/table/Retrieve?resid={resid}&subresid={subresid}&cmswhere={cmswhere}'
});

/**
 * 通过手机号、openid、unionid 来获取验证码
 * 参数：{ telephone, unionid, openid }
 * 1. telephone：手机号
 * 2. unionid：unionid
 * 3. openid：openid
 */
http.createApi('getVerCode', {
  method: 'get',
  baseURL: 'https://finisar.realsun.me/',
  url: '/rsauth/SendValidMsg'
});

/**
 * 注册
 * 参数：{ telephone, unionid, openid, validCode, personid, method }
 * 1. telephone：手机号
 * 2. unionid：unionid
 * 3. openid: openid
 * 4. personid：身份证
 * 5. method：method
 * openid,telephone,unionid,validCode,workNum
 */
http.createApi('register', {
  method: 'get',
  baseURL: 'https://finisar.realsun.me/',
  url: '/rsauth/AuthClient'
});

export default http;
