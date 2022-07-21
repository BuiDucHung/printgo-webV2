import React, {useState, useEffect} from 'react';

import { OrderContext } from 'components/context/OrderContext';
import RequestUtils from 'libs/RequestUtils';
import OrderDetailComplete from './OrderDetailComplete';
import { Col, Pagination, Row } from 'antd';

const TabOrderDone = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState({});
    const [filter, setFilter] = useState({page: 1, type: 'order', status: 8 });

    const onchangePage = (value) => {
      setPage(pre => ({...pre, page: value}));
      setFilter(pre => ({...pre, page: value}))
  }

    useEffect(() => {
      RequestUtils.getCdpDirectResult('/order/all', filter).then(data => {
        setOrders(data?.embedded || []);
        setPage(pre => ({...pre, ...data?.page || {}, page: data.page?.page + 1}))
      })
    
    },[filter])
  return (
      orders.length == 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 630px)'}}>
        Bạn chưa có đơn hoàn thành
      </div>
      ) : (
        <div className='content-order'>
        <Row gutter={[8]}>
            {
                orders.map((order, index) => (
                <OrderContext.Provider value={order}>
                    <Col span={8} xs={24} sm={12} xl={8} key={index}>
                     <OrderDetailComplete key={index} order={order}/>
                    </Col>
                </OrderContext.Provider> 
                ))
            }
          </Row>
        {
           page.totalPages > 1 &&  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Pagination onChange={onchangePage} defaultCurrent={page.page} total={page.totalElements} defaultPageSize={page.size}/>
            </div>
        }
      </div>
      )
  )
}

export default React.memo(TabOrderDone);