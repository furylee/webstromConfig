import * as ReactDOM from 'react-dom';
import {Modal,LocaleProvider} from 'antd';
import React, {Component} from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import styles from './index.less';
import {dynamicWrapper} from '../../utils';

export default class ModalView extends Component {
  static app = undefined;

  static bindApp(app) {
    ModalView.app = app;
  }

  static open(model, content, config = {}) {
    if (!ModalView.app) {
      throw new Error('Please ModalView.bindApp(app); in index.js');
    }

    const div = document.createElement('div');
    document.body.appendChild(div);

    function onCancel(...args) {
      destroy(...args);
      // if (IS_REACT_16) {
      //   render({ ...config, onCancel, visible: false, afterClose: destroy.bind(this, ...args) });
      // } else {
      //   destroy(...args);
      // }
    }


    function destroy(...args) {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
      const triggerCancel = args && args.length &&
        args.some(param => param && param.triggerCancel);
      if (config.onCancel && triggerCancel) {
        config.onCancel(...args);
      }
    }

    function render(props) {
      ReactDOM.render(<ModalView {...props} />, div);
    }

    const title = config.title || 'Modal';
    const {onOk} = config;

    const ModelComponent = dynamicWrapper(ModalView.app, model, content);

    const contenInst = <LocaleProvider locale={zhCN}><ModelComponent store={ModalView.app._store} modalRef={{close: onCancel}} /></LocaleProvider>;
    render({
      maskClosable: false,
      width: '860px', ...config,
      title,
      content: contenInst,
      footer: null,
      visible: true,
      onCancel,
      onOk
    });
    return {
      destroy: onCancel,
      close: onCancel,
    };
  }


  render() {
    return (
      <Modal className={styles.contentModal} {...this.props} >{this.props.content}</Modal>
    );
  }
}
