import React, {Component} from 'react';
import {Link, Redirect, Switch, Route} from 'dva/router';

import {getRoutes} from '../common/router';
import Breadcrumb from '../components/Breadcrumb';

/**
 * 基础layout 添加页面公共属性
 */
function isMainPage({pathname}) {
  return pathname === '/' || pathname === '/mmc';
}

export default class BasicLayout extends Component {
  render() {
    const {routerData, match,location} = this.props;
    return (
      <div style={{backgroundColor: '#FFF',minHeight: '100%'}}>
        {!isMainPage(location) ? <div><Breadcrumb routerData={routerData} pathname={location.pathname} /></div> : null}
        <Switch>
          {getRoutes(match.path, routerData).map(item => {
            return (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />)
          })}
          <Redirect exact from="/" to="/example" />
          <Route component={() => <div>蠢蛋，路由敲错了</div>} />
        </Switch>
      </div>
    )
  }
}
