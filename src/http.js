import axios from "axios";
import qs from "qs";
import {Message,Loading} from 'element-ui';
import Router from '@/router/index'


if(process.env.BASE_API){
  axios.defaults.baseURL = process.env.BASE_API
}else{
  axios.defaults.baseURL = ''
}

//本地开发
axios.defaults.timeout = 60 * 1000 * 10;
// request全局拦截
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  let id = window.sessionStorage.getItem("sourseId");
	let type = window.sessionStorage.getItem("type");
  config.headers['x-client-resource-id'] = `${id}` //将id放到请求头发送给服务器
	config.headers['x-client-type'] = `${type}`   //将id放到请求头发送给服务器
  return config
}, error => {
    return Promise.reject(error)
});

// response全局拦截
axios.interceptors.response.use(response => {
	return response
  // if(response.data.code == 600){
  //   Message.error('你的账号在另一地点登录，已被迫下线!');
  //   localStorage.removeItem('userToken');
  //   Router.push({path: "/login"});
  // }else if(response.data.code == 601){
  //   Message.error('凭证认证失败!');
  //   localStorage.removeItem('userToken');
  //   Router.push({path: "/login"});
  // }else if(response.data.code == 605){
  //   Message.error('账号被锁定或未启用!');
  //   localStorage.removeItem('userToken');
  //   Router.push({path: "/login"});
  // }else if(response.data.code == 608){
  //   Message.error('该账号无后台管理权限!');
  //   localStorage.removeItem('userToken');
  //   Router.push({path: "/login"});
  // }else if(response.data.code == 612){
  //   Message.error('账号异常，请重新登录!');
  //   localStorage.removeItem('userToken');
  //   Router.push({path: "/login"});
  // }else if(response.data.code == 614){
  //   Message.error('账号身份已过期，请重新登录!');
  //   localStorage.removeItem('userToken');
  //   Router.push({path: "/login"});
  // }else if(response.data.code == 615){
  //   Message.error('您的账号权限已变更，需重新登录!');
  //   localStorage.removeItem('userToken');
  //   Router.push({path: "/login"});
  // }else if(response.data.code == 616){
  //   Message.error('访问不在授权范围内!');
  //   localStorage.removeItem('userToken');
  //   Router.push({path: "/login"});
  // }else{
  //   return response
  // }
}, error => {
  return Promise.reject(error.response)
});

export const post = (url, params, config = {}) => {
    return axios({
        method: 'post',
        url: url,
        data: params
    })
}

export const put = (url, params, config = {}) => {
    return axios({
        method: 'put',
        url: url,
        data: qs.stringify(params)
    })
}

export const get = (url,params,config = {}) => {
    return axios({
        method: 'get',
        url: url,
        params: params
    })

}

export const deletes = (url, params, config = {}) => {
    return axios({
        method: 'delete',
        url: url,
        params: params
    })
}

export const baseURL = axios.defaults.baseURL;
