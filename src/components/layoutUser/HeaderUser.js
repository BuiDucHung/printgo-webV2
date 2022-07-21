import React from 'react'
import { Col, Row, Typography } from 'antd'
import {BellFilled} from '@ant-design/icons'

import notify from 'styles/sidebar.module.scss'
import styles from 'styles/customerUser.module.scss'

const { Title } = Typography;
const HeaderUser = ({titleSub}) => {
  return (
         <header className={styles.sideHeader}>
            <Row justify="space-between">
            <Col span={8}>
            <Title level={2} style={{fontSize: 18, color:'#424242'}}>{titleSub}</Title>
         </Col>
         <Col span={8}>
            <div className={styles.rightNotification}>
            <div style={{cursor: 'pointer'}}>
            <BellFilled style={{fontSize: 15, color: '#000'}}/>
            Thông báo
            <span className={notify.themeColor_primary_background}>0</span>
            </div>
            <div>
                Mã thành viên:
                <span className={styles.green}><b> 38536</b></span>
            </div>
            </div>
        </Col>
            </Row>
        </header>
  )
}

export default HeaderUser