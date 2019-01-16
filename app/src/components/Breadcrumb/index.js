import React, {Component} from 'react';
import {Breadcrumb,Icon,Button} from 'antd';
import {Link,routerRedux} from 'dva/router';
import {connect} from "dva/index";
import styles from './index.less';

const { Item } = Breadcrumb;
function getRouteIndex(pathname){
  switch(pathname){
    case '':
    case 'example':
      return '/';
  }
}

@connect(({global}) => ({
  ...global
}))
export default class BreadCrumb extends Component {
  goBack = () => {
    this.props.dispatch(routerRedux.goBack())
  };
  render() {
    const {pathname,routerData}=this.props;
    const defaultPath='/';
    const defaultUrlName=routerData['/'].name;
    const {name}=routerData[getRouteIndex(pathname.split('/')[1])];
    return (
      <div className={styles.container}>
        <Breadcrumb>
          <Item><Link className={styles.link} to={defaultPath}>{defaultUrlName}</Link></Item>
          <Item>{name}</Item>
          <Button size="small" onClick={this.goBack} style={{float: 'right'}}>
            <Icon type="left" /> 回退
          </Button>
        </Breadcrumb>
      </div>
    )
  }
}
