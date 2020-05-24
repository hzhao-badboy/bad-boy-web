import axios from 'axios';
import { Notification } from 'element-ui';

const BASE_HOST = 'http://back.bad-boy.xyz';

const req = {};

const service = axios.create({
  baseURL: BASE_HOST,
  timeout: 50000,
  maxRedirects: 0,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
});

// http request 拦截器
service.interceptors.request.use(
  config => {
    // 全部设置为ajax请求
    config.headers['x-requested-with'] = 'XMLHttpRequest';

    const accessToken = localStorage.getItem('token') || '';
    config.headers.token = accessToken;
    return config;
  },
  err => Promise.reject(err)
);

// http response 拦截器
service.interceptors.response.use(
  res => {
    if (res.data.code !== 0) {
      Notification.error({
        title: res.data.code,
        message: res.data.message
      });
    }
    return res.data;
  },
  err => {
    if (err && err.response) {
      Notification.error({
        title: err.response.status,
        message: err.response.statusText
      });
    }
    return Promise.reject(err);
  }
);

/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
req.get = (url, params) => {
  return new Promise((resolve, reject) => {
    service.get(url, { params: params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
/**
    * post方法，对应post请求
    * @param {String} url [请求的url地址]
    * @param {Object} params [请求时携带的参数]
    */
req.post = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default req;
