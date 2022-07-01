import React, {useState, useCallback, useEffect} from 'react'
import {CheckCircleOutlined, SmallDashOutlined } from '@ant-design/icons'

import styles from 'styles/myOrder.module.css';
import { formatTime, money } from 'utils';
import RequestUtils from 'libs/RequestUtils';
import {message, Modal, Typography } from 'antd';
import InfoDesign from './order/InfoDesign';
import DetailPrice from './order/DetailPrice';
import { decodeProperty } from 'libs';
import Combo from './order/Combo';

const { Title } = Typography;
const OrderItem = ({order, onChoise, nextPress}) => {

   const {id, paid, total} = order;
   const [active, setActive] = useState(false);
   const [showDetail, setShowDetail] = useState(false);

   const onClick = () => {
    if(!showDetail) {
      onChoise(order.id, !active ? 'add' : 'remove');
      setActive(pre => !pre);
    }
  }

   const onClickDot = useCallback( () => {
     setShowDetail(pre => !pre);
   }, [setShowDetail]);

   const parame = { orderIds: id, price: (total - paid)}; 
   const handleSubmit = async () => {
    RequestUtils.postCdpDirectResult('/order/create-history-pay', parame).then(str => {
      if(!str) {
        message.info('Đã có lỗi đường truyền, vui lòng thử lại sau .!');
        return;
      }
       window.location.href = str;
    }) 
}

  return (
    <div className={styles.item__deactice} onClick={onClick}>
        <div className={styles.ct__content}>
        <div style={{display: 'flex', justifyContent: 'start'}}>
        <CheckCircleOutlined className={styles.active}/>
          <div style={{paddingLeft: 4}}>
            <p style={{display: 'flex', gap: 2 , marginBottom: 0}}><strong>Đơn hàng </strong> <span className={styles.order__code}>{order.code}</span></p>
            <p>Ngày đặt {formatTime(new Date(order?.createdAt))}</p>
        </div>
        </div>
        <SmallDashOutlined className={styles.active} onClick={onClickDot}/>
        </div>
            {
              paid < total ? <div onClick={handleSubmit} className={styles.btnPayment}>Thanh toán</div> : ''
            }
        <div className={styles.ct__price}>
            <strong>Tổng chi phí</strong>
            <strong className={styles.price}>{money(order.total)} đ</strong>
        </div>
       {
         showDetail ? (
          <Modal style={{maxWidth: '600px'}} visible={showDetail} closable={false} onCancel={onClickDot} footer={false}>
            <div style={{padding: 20}}>
              {
                order.customerOrderDetail.map((item , key) => (
                <div key={key} >
                <Title level={4}>Mã đơn hàng <span className={styles.signCode}>({item.code})</span></Title>
                <hr/>
                { item.orderType === 0 ? <DesignMore detail={item} /> : <PrintingMore key={key} detail={item} /> }
                <div className={styles.hrb}></div>
                <DetailPrice order={order} offPrice={''} nextPress={nextPress}/>
              </div>
                ))
              }
            </div>
          </Modal>
         ) : (null)
       }

    </div>
  )
}

const PrintingMore = ({detail}) => {
  const {detailPrinting} = detail;
  const [decode, setDecode] = useState({});
  const [library, setLibrary] = useState([]);
 
  useEffect(() => {
    ( async () => {
      decodeProperty(detailPrinting, ['productPractice', 'libraryGroup']);
      const {productPractice: baiIn, libraryGroup: lb} = detailPrinting;
      let decode, library = null;
      if(baiIn) {
        decode = await RequestUtils.postPrice('/practice/decode-property', baiIn);
      }
      if(lb) {
        const ids = lb.map(item => item.libraryGroupDetailId).join(',');
        console.log(ids);
        library = await RequestUtils.openPrice('/library-detail/view', {ids:ids}, [])
      }
      setDecode(decode);
      setLibrary(library);
    })()
  },[detailPrinting])

  return (
    <div>
      <Combo
      dayDuote={detail.dayDuote}
      productPractice={detailPrinting.productPractice  || []}
      dongia={detailPrinting.printingPrice || 0}
      soluong={detailPrinting.quantity || 0}
      unit={detailPrinting.unit || undefined}
      decode={decode}
      libary={library}
      packageId={detailPrinting.packetId || 'N/A'}
      />
    </div>
  )
}

const DesignMore = ({detail}) => {
    const {detailDesign} = detail;

    return (
      <div>
        <InfoDesign data={detailDesign} kichthuoc={''}/>
      </div>
    )
}

export default OrderItem