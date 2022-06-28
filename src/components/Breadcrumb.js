
import React from 'react'
import { Breadcrumb } from 'antd'

import styles from 'styles/breadcrumb.module.css'

const IBreadcrumb = ({title}) => {
  return (
    <div className={styles.breadcrumb}>
        <Breadcrumb>
            <Breadcrumb.Item >
            <a href="/" style={{color: '#000', fontSize: 12}}>Trang chủ</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item className={styles.active}>{title}</Breadcrumb.Item>
     </Breadcrumb>
  </div>
  )
}

export default IBreadcrumb