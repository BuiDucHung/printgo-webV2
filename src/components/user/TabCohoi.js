import { Button, Col, Input, Pagination, Row } from 'antd';
import OrderItem from 'container/order-item';
import RequestUtils from 'libs/RequestUtils';
import React, {useState, useEffect} from 'react'

const TabCohoi = ({setPriceInfo, nextPress}) => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState({page: 1, type: 'cohoi', status: 0});
    const [ page, setPage ] = useState({});
    const [itemChoise, setItemChoise] = useState([]);
  
    const pageChange = (value) => {
       setPage(pre => ({...pre, page: value}));
       setFilter(pre => ({...pre, page: value}))
    }

    useEffect(() => {
      (async() => {
        const data = await RequestUtils.getCdpDirectResult('/order/all', filter);
      setOrders(data?.embedded || []);
      setPage(pre => ({...pre, ...data?.page || {}, page: data.page?.page + 1}))
      })()

    },[filter])

    const onChoise = (id, action='add') => {
        if(action === 'add'){
            if(!itemChoise.includes(id)){
                setItemChoise(pre => pre.concat(id))
            }
        }else{
            const itemFts = itemChoise.filter(item => item !== id);
            setItemChoise(itemFts);
        }
    }

    useEffect(() => {
      setPriceInfo({
        ids: itemChoise,
        price: orders.filter(item => itemChoise.includes(item.id)).reduce(( sum, { total } ) => sum + total , 0)
     })
    },[itemChoise])

  return Array.isArray(orders) && orders.length ? <>
        <div className='content-order'>
            <Row gutter={[8]}>
            {
                orders.map((item, key) => 
                    <Col span={8} xs={24} sm={12} xl={8} key={key}>
                    <OrderItem key={key} order={item} onChoise={onChoise} nextPress={nextPress}/>
                    </Col>
                 )
            }
            </Row>
        </div>
        {
            itemChoise.length ? (
             <DiscountCode/>
            ) : (null)
        }
        {
            page.totalPages > 1 &&  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Pagination onChange={pageChange} defaultCurrent={page.page} total={page.totalElements} defaultPageSize={page.size}/>
            </div>
        }
  </> : (
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 630px)'}}>
       Bạn chưa có đơn nào trong giỏ hàng
     </div>
  )
}

const DiscountCode = () => {
    const [close, onClose] = useState(true);
    const [error, raiseErr] = useState(false);
    const onSubmit = () => raiseErr(true);

    return <>
    <div style={{padding: 20, background: '#eafcfc', marginTop: 10, borderRadius:5}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div><b>Mã giảm giá</b></div>
        <div onClick={()=>onClose(pre => !pre)}>
          <span>Chọn mã giảm giá</span> 
        </div>
      </div>
    </div>
    { !close ? (
        <div>
            <div style={{display: 'flex', gap: 8 , justifyContent: 'space-around', alignItems: 'center'}}>
                <Input placeholder='Nhập mã giảm giá' type={'text'} />
                <Button onClick={onSubmit} style={{background: 'red', color: 'white'}} >Áp dụng</Button>
            </div>
            {error && <p style={{paddingTop:10}} >Mã không hợp lệ .!</p>}
        </div>
    ) : (null)

    }
    </>

}

export default TabCohoi