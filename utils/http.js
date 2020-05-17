/**
* http.js
* 封装axios，
* 调用方法:
* http.get('/api/enquiry/web/query',{id:1}).then((res)=>{你的操作})
* http.post('/api/enquiry/web/update',{id:1}).then((res)=>{你的操作})
* http.postFormData('/api/enquiry/web/update',{id:1,file:file}).then((res)=>{你的操作})
*/
import axios from 'axios';

const BASE_HOST = 'http://back.bad-boy.xyz';
// const BASE_HOST = '';
const req = {};

const service = axios.create({
  timeout: 50000,
  maxRedirects: 0,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
});

// http request 拦截器
service.interceptors.request.use(
  config => {
    // 全部设置为ajax请求
    config.headers['x-requested-with'] = 'XMLHttpRequest';

    const accessToken = localStorage.getItem('token');
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
      if (err.response.status === 401) {
        localStorage.removeItem('token');
        req.redirectToSso();
      }
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
    axios.get(BASE_HOST + url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
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
    axios.post(BASE_HOST + url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
/**
* postFormData方法，对应post请求，用来提交文件+数据
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
req.postFormData = (url, params) => {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        token: localStorage.getItem('token') || ''
      },
      transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
        const formData = new FormData();
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
        return formData;
      }],
      url: BASE_HOST + url,
      method: 'post',
      data: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};

export default req;
