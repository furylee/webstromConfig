import React from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import {LocaleProvider, Spin} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import dynamic from 'dva/dynamic';
import {getRouterData} from './common/router';
import styles from './index.less';

const {ConnectedRouter} = routerRedux;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({history, app}) {
  const routerData = getRouterData(app);
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={routerData['/'].component} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
