# IotRequest

> 修改原dva中request工具，可配置请求头信息、特定页面(404、500等)跳转


## Install

```sh
    npm i @weiyang/web-common -S
```


如果服务有问题, 请更新到最新版本


通用IOT前端服务

-   createInstance 创建http请求, 支持axios options

```js
import {createInstance} from '@weiyang/web-common';
const request = createInstance();
const result = await request.post(url,data,options);
```

-   http 全局默认实例{axios instance}

```js
import {http} from '@weiyang/web-common';
const result = await http.post(url,data,options);
```

-   registHandler 注册状态码处理句柄（请在http方法调用前配置）

```js
import {registHandler} from '@weiyang/web-common';
registHandler({
  401: (result) => {
    window.location.href = result.redirect || '/login';
  }
})
const result = await http.post(url,data,options);
```

-   DictionaryService  字典数据服务
    -   optionsByDicTypeCode(dicTypeCode) 根据dicTypeCode 查询字典可用值
    -   query(condition) 根据条件查询字典数据

> 本地开发增加规则,代理到门户  "POST /api/ziot/tms/*": "http://10.45.53.135:7001/api/ziot/tms/",