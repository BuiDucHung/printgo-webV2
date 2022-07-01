import { Typography } from 'antd';
import { formatTimeDone, textDetailStatus } from 'components/user/User-utils';
import React from 'react'

import styles from 'styles/user.module.css';
import payInfo from 'styles/myOrder.module.css';
import { money } from 'utils';
import CustomeIcon from 'utils/CustomeIcon';
import RequestUtils from 'libs/RequestUtils';

const {Text,Title} = Typography;
const Printing = ({detail, paid, total, id, code}) => {
    const parame = { orderIds: id, price: (total - paid)}; 

    const handleSubmit = () => {
        RequestUtils.postCdpDirectResult('/order/create-history-pay', parame).then(str => {
          if(!str) {
            Toast.info('Đã có lỗi đường truyền, vui lòng thử lại sau .!');
            return;
          }
          window.location.href = str
        }) 
    }
  
    const { detailPrinting } = detail;
  
  return (
    <div>
        <div className={styles.detail_head}>
           <div className={styles.title}>Đơn hàng <span style={{color: 'yellow', fontWeight: 'bold'}}>{code}</span></div>
           <div className={styles.title}>{detailPrinting?.productName || 'N/A'}</div>
        </div>
        <div style={{padding: 10}}>
            <div className={styles.status_wrap}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <CustomeIcon style={{width:15, height: 15}} type='/svg/ft-menu-design.svg'/>
                    <Text >{textDetailStatus(detail.status)}</Text>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <CustomeIcon style={{width:15, height: 15}} type='/svg/clock.svg'/>
                    <Text style={{paddingLeft: 5}}>{formatTimeDone(detail.createdAt)}</Text>
                </div>
            </div>
            <div className={styles.flex_Content}>
                <Title level={5} style={{fontSize: 14}}>Số lượng</Title>
                <Text>{detailPrinting?.quantity || 'N/A'} {detailPrinting?.unit || ''}</Text>
            </div>
            <div className={styles.flex_Content}>
                <Title level={5} style={{fontSize: 14}}>Thời gian dự kiến</Title>
                <Text>{detail?.dayDuote || 'N/A'} ngày</Text>
            </div>
            <div className={styles.flex_Content}>
            {
              paid < total ? 
              <div onClick={handleSubmit} className={payInfo.btnPayment} style={{padding: 0, marginLeft: 0, marginBottom: 0}}>Thanh toán</div> 
              : (null)
            }
            
            <Text style={{textAlign:'right', display: 'block'}}>{formatTimeDone(detail.intentTime)}</Text>
            </div>
            </div>
            <div className={styles.flex_Content} style={{borderTop: '1px solid #3dbeb3', paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
                <Title level={5} style={{fontSize: 14, paddingTop: 10}}>Chi phí</Title>
                <Text style={{color: 'red', fontWeight: 600}}>{money(detail.total)} đ</Text>
            </div>    
    </div>
  )
}

export default React.memo(Printing)