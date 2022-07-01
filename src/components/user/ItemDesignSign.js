import React, {useState, useEffect} from 'react'
import { Modal } from 'antd';
import InfoDesign from 'container/order/InfoDesign';
import Printing from 'container/order/Printing';
import RequestUtils from 'libs/RequestUtils';

import styles from 'styles/user.module.css';
import OrderHistory from './OrderHistory';
import OrderHistoryTimeline from './OrderHistoryTimeline';

const ItemDesignSign = ({detail, paid, total, id, code}) => {

  const {detailDesign, status} = detail;
  const [showDetail ,setShowDetail] = useState(false);
  const [ detailEdits, setDetailEdits ] = useState([]);

  const clickDetail = () => setShowDetail(pre => !pre);

  useEffect(() => {
    const detailEdit = async () => {
        const data = await RequestUtils.getCdpDirectResult(`/cdp/order-edit/${detail.code}`);
        setDetailEdits(data.data);
    }
    detailEdit();
  },[showDetail])

  return ( 
    <>
      <div className={styles.detail_order}>
        <Printing detail={detail} paid={paid} total={total} id={id} code={code}/>
        <div className={styles.detail_more}>
            <span style={{cursor: 'pointer'}} onClick={clickDetail}>Xem chi tiết</span>
        </div>
      </div>
      {
        showDetail && <Modal style={{maxWidth: '600px'}} 
        visible={showDetail} closable={false} 
        footer={false} onCancel={clickDetail}>
         <div style={{padding: 20}}>
            <OrderHistory detailEdits={detailEdits} status={status} detailId={detail.id}/>
            <OrderHistoryTimeline code={detail.code}/>
          <InfoDesign data={detailDesign} kichthuoc={detailDesign?.kichthuoc || ''}/>
         </div>
        </Modal>
      }
    </>
  )
}

export default ItemDesignSign