import RequestUtils from 'libs/RequestUtils';
import React, {useState} from 'react'
import { useStore } from 'StoreContext';



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
      console.log(items);
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
    <div></div>
  )
})

export default OrderHistoryTimeline