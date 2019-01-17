/**
 * Created by pengj on 2018-4-12.
 */
'use strict';
const Cookies = require('js-cookie');
const axios = require('axios');
const _ = require('lodash');

const DEF_AXIOS_OPTS = {
  timeout: 6000
};


let DEFAULT_HANDLERS={
  401: (result) => {
    window.location.href = result.redirect || '/login';
  }
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function matchCodeMes(response) {
  const errortext = codeMessage[response.status] || response.statusText;
  return errortext
}

function responseHandler(resp) {
  const data = resp.data;
  if (data.status === 'ok') {
    return data.result;
  }
  return Promise.reject(data.result);
}

function requestHandler(config) {
  const cookie = Cookies.get('csrfToken') || '';
  if(cookie){
    config['headers']['x-csrf-token'] = cookie;
  }
	return config
}

function responseErrorHandler(error) {
  let message,
    code;

  if (error.response) {
    const {data, status} = error.response;
    if (data.result) {
      message = data.result.message;
      code = data.result.code;
    }

    if (code === undefined) {
      code = status;
    }

    // let handler = DEFAULT_HANDLERS[status];
    let handler = DEFAULT_HANDLERS[status];

    if(_.isString(handler)){
      window.location.href = handler;
    }

    if(_.isFunction(handler)){
      handler(data.result, error.response)
    }

    message = matchCodeMes(error.response)
  }

  if (message === undefined) {
    message = error.message || error;
  }

  if (code === undefined) {
    code = -1;
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ message, code });
}

function createInstance(axiosOptions) {
  const options = _.defaultsDeep(DEF_AXIOS_OPTS, axiosOptions)

  const instance = axios.create(options);

  // 回调请求
  instance.interceptors.response.use(responseHandler, responseErrorHandler.bind(options));

  // 异常请求
  instance.interceptors.request.use(requestHandler);
//   instance.interceptors.request.use(responseInterceptor);
  return instance;
}

function registHandler(handlerOptions) {
    _.defaultsDeep(DEFAULT_HANDLERS, handlerOptions)
}

const http = createInstance();

export {
  createInstance,
  http,
  registHandler
};
