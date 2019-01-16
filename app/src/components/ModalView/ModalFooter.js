/**
 * ziot-space-front ModalFooter
 * Created by pengj on 2018-5-23.
 */

import React, { Component } from 'react';
import styles from './index.less'

export default class ModalFooter extends Component {
  render() {
    return (
      <div  className={styles.modalFooter} >
        <div className={styles.actions}  >
          {this.props.children}
        </div>
      </div>
    );
  }
}
