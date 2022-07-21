import RequestUtils from 'libs/RequestUtils';
import React, {useState} from 'react'
import "react-vertical-timeline-component/style.min.css";

import { useStore } from 'StoreContext';
import { formatTimeDone } from './User-utils';
import {colorByStatus} from '../../config';
import { Timeline, Typography } from 'antd';


const {Title} = Typography;
const generaItem = (datas, user) => {

  let items = [];
  const uReplace = ['Admin', 'SuperAdmin', 'HanhCTM'];
  const onlyIgnior = [0, null];
  for(let data of datas ) {
      if(onlyIgnior.includes(data.statusColor)) {
          continue;
      }
      data['username'] = uReplace.includes(data.username) ? user.fullname : data.username;
      items.push(data);
  }
  return items;
}

const OrderHistoryTimeline = React.memo(({code}) => {
  const { state: { user }} = useStore();
  const [ historyOrder, setHistoryOrder ] = useState([]);

  React.useEffect(() => {
    RequestUtils.getCdpDirectResult('/cdp/order-history/' + code).then((str => {
        const history = str.data?.history || [];
        const newHistory = generaItem(history, user);
        setHistoryOrder(newHistory);
    }));
}, []); 

  return (
    <div >
      {historyOrder.length > 0 ? <Title level={5}>Lịch sử đơn hàng</Title> : ''}
    <Timeline mode="left">
      {
        historyOrder.map((event, index) => (
          <Timeline.Item color={colorByStatus(event.statusColor)} key={index} label={formatTimeDone(event.inTime)}>
            <p style={{color: colorByStatus(event.statusColor)}}>{event.action} Bởi {event.username}</p>
            </Timeline.Item>
        ))
      }
      </Timeline>
    </div>
  )
})

export default OrderHistoryTimeline