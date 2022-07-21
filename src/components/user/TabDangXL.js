
import {Row, Col, Pagination } from 'antd';
import { OrderContext } from 'components/context/OrderContext';
import RequestUtils from 'libs/RequestUtils';
import React, {useState} from 'react'
import OrderDetail from './OrderDetail';

const TabDangXL = () => {
    const [order, setOrder] = useState([]);
    const [page, setPage] = useState({});
    const [filter, setFilter] = useState({page: 1});
  
   const onchangePage = (value) => {
       setPage(pre => ({...pre, page: value}));
       setFilter(pre => ({...pre, page: value}))
   }

    React.useEffect(() => {
        RequestUtils.getCdpDirectResult('/order/process', filter).then(data => {
            setOrder(data?.embedded || []);
            setPage(pre => ({...pre, ...data?.page || {}, page: data?.page?.page + 1}));
        })
    },[filter])

  return Array.isArray(order) && order.length ? (
      <div>
          <Row gutter={[8]}>
            {
                order.map((order, index) => (
                <OrderContext.Provider value={order}>
                    <Col span={8} xs={24} sm={12} xl={8} key={index}>
                        <OrderDetail key={index} order={order}/>
                    </Col>
                </OrderContext.Provider> 
                ))
            }
          </Row>
          {
           page.totalPages > 1 && <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Pagination onChange={onchangePage} defaultCurrent={page.page} total={page.totalElements} defaultPageSize={page.size}/>
            </div>
          }
      </div>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 630px)'}}>
    Bạn không có đơn nào đang xử lý
  </div>
  )
}

export default  React.memo(TabDangXL);