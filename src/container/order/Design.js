import React, {useEffect, useState} from 'react'
import { SanPham } from 'service/userService';

import { Col, message, Row, Typography } from 'antd';
import styles from 'styles/user.module.scss';
import orderUser from 'styles/myOrder.module.scss';

import {CheckCircleOutlined, PlusOutlined, MinusOutlined} from '@ant-design/icons';
import { textDetailStatus } from 'components/user/User-utils';
import RequestUtils from 'libs/RequestUtils';
import { money } from 'utils';
import { useRouter } from 'next/router';
import axios from 'axios';



const {Title, Text} = Typography;
const Design = ({detail, paid, enterpriseName, showDetail, onClickDetail, total, id, code}) => {
  
    const { chuyenMucId } = detail;
    const [ name, setName ] = useState();

    const parame = { orderIds: id, price: (total - paid)}; 
    const handleSubmit = async () => {
      RequestUtils.postCdpDirectResult('/order/create-history-pay', parame).then(str => {
        if(!str) {
          message.success('Đã có lỗi đường truyền, vui lòng thử lại sau .!');
          return;
        }
         window.location.href = str;
      }) 
  }
  
     useEffect( async () => {
      SanPham.findNameThietKe(chuyenMucId).then(setName);
    },[chuyenMucId])

  return (
    <div className={styles.detail_order}>
      <Row gutter={[6]} align="stretch" style={{margin: 10}}>
        <Col span={3}>
        <CheckCircleOutlined className={styles.colorIcon}/>
        </Col>
        <Col span={18}>
        {
          enterpriseName == null ? 
          <Title level={5} style={{fontSize: '15px', margin: 0}}><Text style={{color: '#3dbeb3'}}> {code}</Text></Title>
          :
          <Title level={5} style={{fontSize: '15px', margin: 0}}>Đơn {name} <Text style={{color: '#3dbeb3'}}> {code}</Text></Title>
        }
        <Text style={{color: '#3dbeb3'}}>Đơn hàng {textDetailStatus(detail.status)}</Text>
        </Col>
        <Col span={3}>
          {
          showDetail ? <MinusOutlined onClick={onClickDetail} className={styles.colorIcon}/>
          : <PlusOutlined onClick={onClickDetail}  className={styles.colorIcon}/>  
          }
        </Col>
      </Row>
        {
          paid < total ?  <div onClick={handleSubmit} className={orderUser.btnPayment}>Thanh toán</div> : ''
        }
       <div className={styles.flex_Content} style={{borderTop: '1px solid #3dbeb3', paddingLeft: 16, paddingRight: 16}}>
          <Title level={5} style={{fontSize: 14, paddingTop: 10}}>Tổng chi phí</Title>
          <Text style={{color: 'red', fontWeight: 600}}>{money(detail.total)} đ</Text>
      </div>   
    </div>
  )
}



export default React.memo(Design)