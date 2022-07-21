import React, {useState, useEffect} from 'react'
import { Drawer, Modal } from 'antd';
import Printing from 'container/order/Printing';
import RequestUtils from 'libs/RequestUtils';


import styles from 'styles/user.module.scss';
import { decodeProperty } from 'libs';
import Combo from 'container/order/Combo';

import OrderHistoryTimeline from './OrderHistoryTimeline';

const ItemPrint = ({detail, paid, total, id, code}) => {
  const {detailPrinting} = detail;
  const {productPractice} = detailPrinting;
  const [showDetail ,setShowDetail] = useState(false);
  const [ decode, setDecode ] = useState({});
  const [ library, setLibrary ] = useState([]);
  
  const clickDetail = () => setShowDetail(pre => !pre);

  useEffect(() => {
      const printItem = async () => {
        if(!showDetail || !detail?.code){
          return;
        }
        decodeProperty(detailPrinting, ['productPractice', 'libraryGroup']);
        const { productPractice: baiIn, libraryGroup: lb } = detailPrinting;
        let decode, libsary = null;
        if(baiIn){
          decode = await RequestUtils.postPrice('/practice/decode-property', baiIn);
        }
        if(lb){
          const ids = lb.map(item => item.libraryGroupDetailId).join(',');
          libsary = await RequestUtils.openPrice('/library-detail/view', {ids: ids}, [])
        }
        setDecode(decode);
        setLibrary(libsary)
      }
      printItem();
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
        showDetail && <Drawer visible={showDetail} width={600} onClose={clickDetail}>
             <div>
             <Combo
                dayDuote={detail.dayDuote}
                dongia={detailPrinting?.printingPrice || 0}
                soluong={detailPrinting?.quantity || 0}
                unit={detailPrinting?.unit || undefined}
                decode={decode} 
                productPractice={productPractice}
                library={library} 
                packageId={detailPrinting?.packetId || 'N/A'} />
                <OrderHistoryTimeline code={detail.code}/>
             </div>
        </Drawer>
      }
    </>
  )
}

export default ItemPrint