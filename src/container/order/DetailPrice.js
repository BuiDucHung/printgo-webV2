import React, {useState,} from 'react'
import {DownOutlined, RightOutlined} from '@ant-design/icons'
import { Button, Typography} from 'antd';

import styles from 'styles/myOrder.module.css';
import { money } from 'utils';

const { Title } = Typography;
const DetailPrice = ({order, offPrice= 0, nextPress}) => {
    const [showPayment, setShowPayment] = useState(false);
  return (
    <div style={{marginTop: 15}}>
        <div className={styles.ct__content}>
        <div className="price-bt">
        <p className={styles.price} style={{marginBottom: 0}} >{money(order.total)} vnđ</p>
        <div style={{display: 'flex', justifyContent: 'start', gap: 3, alignItems: 'center', cursor: 'pointer'}} onClick={() => setShowPayment(pre => !pre)}>
        <p style={{marginBottom: 0}}>Chi tiết</p>
        {showPayment ? <DownOutlined/> : <RightOutlined /> } 
        </div>
        </div>
        <div>
            <Button color='primary' className={styles.btnButton} onClick={nextPress}>Tiếp tục</Button>
        </div>
        </div>
      {
          showPayment ? (
            <div>
               <Title level={5} style={{textAlign: 'center'}}>CHI TIẾT GIÁ</Title> 
               <div className={styles.ct__content}>
                <Title level={5}>Tổng chi phí</Title>
                <span className={styles.price}>{money(order.total)} đ</span>
               </div>
               <div className={styles.ct__content}>
                <Title level={5}>Giảm giá</Title>
                <span className={styles.price}>{money(offPrice)} đ</span>
               </div>
            </div>
          ) : (null)
      }
    </div>
  )
}

export default DetailPrice