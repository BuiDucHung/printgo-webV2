
import React from 'react'
import { Breadcrumb } from 'antd'

import { useStore } from 'StoreContext';
import styles from 'styles/breadcrumb.module.scss'
import Link from 'next/link';

const IBreadcrumb = ({title, name}) => {
  const {state: {user}} = useStore();
  return (
    <div className={styles.breadcrumb}>
        <Breadcrumb>
            <Breadcrumb.Item >
            <Link href="/" style={{color: '#000', fontSize: 12}}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className={user?.id ? styles.active : null}>{title}</Breadcrumb.Item>
            <Breadcrumb.Item className={styles.active}>{name}</Breadcrumb.Item>
     </Breadcrumb>
  </div>
  )
}

export default IBreadcrumb