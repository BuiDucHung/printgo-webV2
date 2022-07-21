import React from 'react'
import {Col, Row} from 'antd'

import styles from 'styles/customerUser.module.scss'
import Sidebar from './Sidebar'
import HeaderUser from './HeaderUser'

const LayoutWebsite = (props) => {
  const { titleSub } = props;
  return (
    <div className={styles.contentEnduser}>
        <Row>
            <Col span={5}>
             <Sidebar/>
            </Col>
            <Col span={19}>
               <div className={styles.sideContent}>
                <HeaderUser titleSub={titleSub}/>
                <main style={{padding: '20px 22px 26px 22px'}}>
                    {props.children}
                </main>  
               </div>
            </Col>
        </Row>
    </div>
  )
}

export default LayoutWebsite