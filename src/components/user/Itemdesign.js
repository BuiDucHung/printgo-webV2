import { Drawer, Modal,Tabs, Typography } from 'antd';
import Design from 'container/order/Design';
import DetaiOrderComplete from 'container/order/DetaiOrderComplete';
import InfoDesign from 'container/order/InfoDesign';
import RequestUtils from 'libs/RequestUtils';
import React, {useState, useEffect} from 'react'

import OrderHistory from './OrderHistory';
import OrderHistoryTimeline from './OrderHistoryTimeline';

const {Title} = Typography
const { TabPane } = Tabs;
const Itemdesign = ({enterpriseName, detail, code , id, paid, total}) => {
  
  const {detailDesign, status} = detail;
  const [ showDetail, setShowDetail ] = useState(false);
  const [detailCompleted, setDetailCompleted] = useState(false);
  const [ detailEdits, setDetailEdits ] = useState([]);
  const onClickDetail = () => setShowDetail(pre => !pre);
  const clickDetailComplete = () => setDetailCompleted(pre => !pre); 

  useEffect( () => {
    const detailHistory = async() => {
      if(!showDetail || !detail?.code) {
        return;
      }
      RequestUtils.getCdpDirectResult('/cdp/order-edit/' + detail.code).then ( data => {
        if(data?.data && Array.isArray(data.data)) {
          setDetailEdits(data.data);
        }
      });
    }
    detailHistory();
  }, [showDetail]);
  
  return (
    <div >
      <Design detail={detail} paid={paid}  enterpriseName={enterpriseName} showDetail={showDetail} onClickDetail={onClickDetail} total={total} id={id} code={code}/>
      {
        showDetail ? (
          <Drawer visible={showDetail} width={600} onClose={onClickDetail}>
            <Tabs defaultActiveKey={'1'}>
            <TabPane tab="Chi tiết đơn hàng" key="1">
              <Title level={5}>Chi tiết Đơn hàng</Title>
            <DetaiOrderComplete  detail={detail} total={total} id={id} code={code}/>
          </TabPane>

          <TabPane tab="Lịch sử  đơn hàng" key="2">
            <OrderHistory detailEdits={detailEdits} status={status} detailId={detail.id}/>
            <OrderHistoryTimeline code={detail.code}/>
          </TabPane>
          
          <TabPane tab="Thông tin thiết kế" key="3">
          <InfoDesign data={detailDesign} kichthuoc={detailDesign?.kichthuoc || ''}/>
          </TabPane>
            </Tabs>
          </Drawer>
        ) : null
      }
    </div>
  )
}

export default Itemdesign